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

        getItem('Admins', 'admins', <FaUser />, null, [
            getItem('Admins List', 'admins-list', null, '/Admin/list'),
            getItem('Add Admin', 'admin-add', null, '/admin/add'),
        ]),

        getItem('Patients', 'patients', <FaUser />, null, [
            getItem('Patient List', 'patients-list', null, '/patient/list'),
            getItem('Add Patient', 'patient-add', null, '/patient/add',),
        ]),

        getItem('Doctors', 'doctors', <FaUserMd />, null, [
            getItem('Doctor List', 'doctor-list', null, '/doctor/list',),
            getItem('Add Doctor', 'doctors-add', null, '/doctor/add',),
        ]),

        getItem('Appointments', 'Appointment', <FaCalendarPlus />, null, [
            getItem('Calendar View', 'appointments-calendar', null, '/appointments/calendar',),
            getItem('List', 'appointments-list', null, '/appointments/list',),
            getItem('Schedule', 'appointments-schedule', null, '/appointments/schedule',),
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