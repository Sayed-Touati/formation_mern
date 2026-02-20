import { Button, Divider, Space, Table, Tag, message } from "antd"
import React, { useState, useEffect } from "react"
import axios from 'axios'
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import EditUserDrawer from "../components/EditUserDrawer"


const AdminsList = () => {

   const [users, setUsers] = useState([])
   const [refresh, setRefresh] = useState(false)
   const navigate = useNavigate()

   const roleColors = {
      ADMIN: 'red',
      DOCTOR: 'blue',
      PATIENT: 'green',
   };

   const columns = [
   {
      title: "Created At",
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: text => format(text, 'yyyy-MM-dd HH:mm')
   },
   {
      title: 'First Name',
      dataIndex: 'firstName',
      Key: 'firstName'
   },
   {
      title: 'Last Name',
      dataIndex: 'lastName',
      Key: 'lastName'
   },
   {
      title: 'Email',
      dataIndex: 'email',
      Key: 'email'
   },
   {
      title: 'Account Type',
      dataIndex: 'role',
      Key: 'role',
      render: role => (
         <Tag color={roleColors[role]}>
            {role}
         </Tag>
      ),
   },
   {
      title: 'Actions',
      render: (_, record) => (
         <Space>
            <Button type="link" size="small">Details</Button>
            {/* <Button type="primary" size="small" onClick={() => {
               navigate('/admin/edit/'+record._id)
            }}>Edit</Button> */}
            <EditUserDrawer userDetails={record} refresh={refresh} setRefresh={setRefresh} />
         </Space>
      )
   },
]

   useEffect(() => {
      async function fetchData() {
         try {
            const response = await axios.get('http://localhost:3000/user/')

            setUsers(response.data.users)
         } catch (error) {
            console.log(error.response)
            message.error(error.response.data.message)
         }
      }
      fetchData()
   }, [refresh])

  return (
    <div>
      <h4>
        Admins List
      </h4>
      <Divider />
      <Table columns={columns} dataSource={users} scroll={{ x: 'max-content' }} />
    </div>
  )
}

// email, firstName, lastName, dob, role, createdAt
export default AdminsList
