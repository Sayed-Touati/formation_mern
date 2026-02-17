import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import { ConfigProvider } from 'antd';
import { AuthContext } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import AddUser from './pages/AddUser';
import UsersList from './pages/UsersList';

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
              <Route index element={<Home />} />
              <Route path='/User/add' element={<AddUser />} />
              <Route path='/User/list' element={<UsersList />} />
            </Route>
            {token && <Route path='/' element={<Home />} />}
            {!token && <Route path='*' element={<Login />} />}
          </Routes>
        </BrowserRouter>
    </ConfigProvider>
  )
}

export default App;