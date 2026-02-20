import { Divider, Form, Input, Button, DatePicker, Select, message } from 'antd'
import {format} from 'date-fns'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'

const EditUser = () => {
    const [form] = Form.useForm()

    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        async function getById() {
            try {
                const response = await axios.get('http://localhost:3000/user/' + id)

                form.setFieldsValue({
                    ...response.data.user,
                    ...Button(response.data.user.dob && {dob: dayjs(response.data.user.dob)})
                })
            } catch (error) {
                message.error(error.response.data.message)
            }
        }
        
        if (id) {
            // call api and set fields
            getById()
        }  
    }, [id])

   async function onFinish(values) {
      try {
        const payload = {
        ...values,
        dob: format(values.dob, "yyyy-MM-dd")
        }

        const response = await axios.put('http://localhost:3000/user/update/' + id, payload)

        message.success(response.data.message)
      navigate('/admin/list')
      } catch (error) {
         message.error(error.response.data.message);
      }
   }
   return (
      <div>
         <h4>
            Edit User
         </h4>
         <Divider />
         <Form onFinish={onFinish} form={form}>
            <Form.Item
               label = "Email"
               name = 'email'
               rules = {[{required: true, message: 'Email is required'}]}
            >
               <Input/>
            </Form.Item>

            <Form.Item
               label = "First Name"
               name = 'firstName'
               rules = {[{required: true, message: 'first Name is required'}]}
            >
               <Input/>
            </Form.Item>

            <Form.Item
               label = "Last Name"
               name = 'lastName'
               rules = {[{required: true, message: 'last Name is required'}]}
            >
               <Input/>
            </Form.Item>

            <Form.Item
               label = 'Date Of Birth'
               name = 'dob'
            >
               <DatePicker style={{width: "100%"}} />
            </Form.Item>

            <Form.Item
               label = 'Account Type'
               name = 'role'
               rules = {[{
                  required: true, message: 'Account type is required'
               }]}
            >
               <Select  
                  options={[
                     {value: "ADMIN", label: 'Admin'},
                     {value: "PATIENT", label: 'Patient'},
                     {value: "DOCTOR", label: 'Doctor'}
                  ]}
               />
            </Form.Item>

            <Button type='primary' htmlType='submit'>
               Edit
            </Button>
         </Form>
      </div>
  )
}
// email, firstName, lastName, password, confirmPassword, dob, role

export default EditUser
