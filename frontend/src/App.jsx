import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext } from 'react';

import { ConfigProvider } from 'antd';

import { AuthContext } from './contexts/AuthContext';

import Login from './pages/Login';
import SignUp from './pages/SignUp';

import MainLayout from './layouts/MainLayout';

import Dashboard from './pages/Dashboard';

import AdminsList from './pages/AdminsList';
import AddAdmin from './pages/AddAdmin';

import PatientsList from './pages/PatientsList'
import AddPatient from './pages/AddPatient'

import DoctorsList from './pages/DoctorsList'
import AddDoctor from './pages/AddDoctor'

import AppointmentCalendar from './pages/AppointmentsCalendar'
import AppointmentsList from './pages/AppointmentsList'
import AppointmentsSchdule from './pages/AppointmentsSchedule'


function App() {
  const {token} = useContext(AuthContext);
  return (
    <ConfigProvider
      theme={{
        "token": {
          "colorPrimary": "#078EE7",
          "colorInfo": "#078EE7",
        }
      }}
    >
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='/admin/list' element={<AdminsList />} />
              <Route path='/admin/add' element={<AddAdmin />} />
              <Route path='/patient/list' element={<PatientsList />} />
              <Route path='/patient/add' element={<AddPatient />} />
              <Route path='/doctor/list' element={<DoctorsList />} />
              <Route path='/doctor/add' element={<AddDoctor />} />
              <Route path='/appointments/calendar' element={<AppointmentCalendar />} />
              <Route path='/appointments/list' element={<AppointmentsList />} />
              <Route path='/appointments/schedule' element={<AppointmentsSchdule />} />
            </Route>

            {!token && <Route path='*' element={<Login />} />}
          </Routes>
        </BrowserRouter>
    </ConfigProvider>
  )
}

export default App;