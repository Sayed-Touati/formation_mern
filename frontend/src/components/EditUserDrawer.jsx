import { Button, Drawer, Form, Input, DatePicker, Select, message } from "antd"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { format } from "date-fns"
import axios from "axios"


const EditUserDrawer = (props) => {

   const [open, setOpen] = useState(false)
   const [form] = Form.useForm()
   const {userDetails, refresh, setRefresh} = props
   const showDrawer = () => {
      setOpen(true)
   }
   const onClose = () => {
      setOpen(false)
   }

   useEffect(() => {
      form.setFieldsValue({
         ...userDetails,
         ...(userDetails.dob && {dob: dayjs(userDetails.dob)})
      })
   })

   async function onFinish(values) {
      try {
        const payload = {
        ...values,
        dob: format(values.dob, "yyyy-MM-dd")
        }

        const response = await axios.put('http://localhost:3000/user/update/' + userDetails._id, payload)

        message.success(response.data.message)
        setRefresh(!refresh)
        onClose()
      } catch (error) {
         message.error(error.response.data.message);
      }
   }
 
  return (
    <>
      <Button type="primary" size="small" onClick={showDrawer}>Edit</Button>
      <Drawer 
         title= 'Edit User'
         closable= {{ 'aria-label': 'Close Button' }}
         onClose={onClose}
         open= {open}
      >
         <Form onFinish={onFinish} form={form} layout="vertical">
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
      </Drawer>
    </>
  )
}

export default EditUserDrawer
