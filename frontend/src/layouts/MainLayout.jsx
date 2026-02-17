import { MdDashboard, MdLogout } from "react-icons/md";
import { FaUser, FaUserMd } from "react-icons/fa";
import { FaCalendarPlus } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const { Sider, Header, Content } = Layout;

function getItem(label, key, icon, path, children) {
    return {
        key,
        icon,
        children,
        label: path ? <Link to={path}>{label}</Link> : label,
    };
}

function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);

    const items = [
        getItem('Dashboard', 'dashboard', <MdDashboard />, '/'),

        getItem('Users', 'users', <FaUser />, null, [
            getItem('Admins List', 'users-admins', null, null),
            getItem('Add Admin', 'users-roles', null, null),
        ]),

        getItem('Patients', 'patients', <FaUser />, null, [
            getItem('Patient List', 'patients-list', null, null),
            getItem('Add Patient', 'patients-add', null, null),
        ]),

        getItem('Doctors', 'doctors', <FaUserMd />, null, [
            getItem('Doctor List', 'doctors-list', null, null),
            getItem('Add Doctor', 'doctors-add', null, null),
        ]),

        getItem('Appointments', 'Appointment', <FaCalendarPlus />, null, [
            getItem('Calendar View', 'appointments-calendar', null, null),
            getItem('List', 'appointments-list', null, null),
            getItem('Schedule', 'appointments-schedule', null, null),
        ]),

        getItem('Settings', 'Setting', <IoMdSettings />, null),

        getItem('Logout', 'logout', <MdLogout />, null)
    ]
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <Menu theme="dark" defaultSelectedKeys={['home']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, backgroundColor: "#ffffff" }} />
                <Content style={{ margin: '0 16px'}}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            borderRadius: 14,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout;