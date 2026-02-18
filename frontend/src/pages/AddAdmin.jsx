import { Divider, Form, Input, Button, DatePicker, Select, message } from 'antd'
import {format} from 'date-fns'
import axios from 'axios'

const AddAdmin = () => {

   async function onFinish(values) {
      try {
         const payload = {
            ...values,
            dob: format(values.dob, "yyyy-MM-dd")
         }

         const response = await axios.post('http://localhost:3000/user/create', payload)

         message.success(response.data.message)
      } catch (error) {
         message.error(error.response.data.message);
      }
   }

   return (
      <div>
         <h4>
            Create New Admin
         </h4>
         <Divider />
         <Form onFinish={onFinish}>
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
               label = 'Password'
               name = 'password'
               rules = {[
                  {required: true, message: 'Password is required'},
                  {min: 8, message: 'Password must be a minimun of 8 characters'}
               ]}
            >
               <Input.Password/>
            </Form.Item>

            <Form.Item
               label = 'Confirm Password'
               name = 'confirmPassword'
               rules = {[
                  {required: true, message: 'Confirm Password is required'},
                  {min: 8, message: 'Confirm Password must be a minimun of 8 characters'}
               ]}
            >
               <Input.Password/>
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
               Create
            </Button>
         </Form>
      </div>
  )
}
// email, firstName, lastName, password, confirmPassword, dob, role

export default AddAdmin
