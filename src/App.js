import { Button, DatePicker, Space } from 'antd';
import './App.css';
import { Route, Routes } from 'react-router-dom';


import Auth from './Components/Auth/Auth';
import Login from './Components/Auth/Login';
import Signin from './Components/Auth/Signin';
import Home from './Components/Home/Home';
import Settings from './Components/Settings/Settings';
import Profile from './Components/Settings/Profile/Profile';
import Dashboard from './Components/Admin/Dashboard';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element = {<Auth />} >
          <Route index   element={ <Login value={"login"} />} />
          <Route path='login' element={ <Login value={"login"} />} />
          <Route path='signin' element={ <Signin />} />
        </Route>
        <Route path='/settings' element={<Settings />} >
            <Route index element={<Profile />}></Route>
        </Route>

        {/* <Route path='/admin/login' element={<Login value={"login"} />} /> */}
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/auth' element = {<Auth />} >
          <Route path='login' element= {<Login isAdmin = {true} />}/>
        </Route>

        <Route path='*' element={<h1 className='text-center'>Invalid url</h1>} />
      </Routes>
    </div>
  );
}

export default App;
