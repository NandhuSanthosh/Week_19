import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import Logo from '../Logo/Logo'
import { isUserLoggedIn } from '../Auth/handleLogin'
import Loading from '../Loading/Loading'
import { useDispatch } from 'react-redux'
import { loggedIn } from '../../redux/user/reducer'

const Settings = () => {

    const [userLogged, setUserLogged] = useState(false)

    let navigate = useNavigate();
    const userDispatch = useDispatch()

    useEffect(() => {
      isUserLoggedIn( (user) => {
        navigate('/auth/login');
    },(user)=> {
        setUserLogged(true)
        userDispatch( loggedIn(user) )
      } )
    }, [])
    // useEffect(() => {
    //   isUserLoggedIn( () => {
    //     navigate('/auth/login');
    //   },setUserLogged)
    // }, [])

    return (
        <div className='h-full bg-gray-200'>
            {
                userLogged ? 
                <>
                <div className='flex h-full'>
                    <div className='pt-5 px-8 w-2/12'>
                        <div>
                            <Link to={'/'} >
                                <Logo color={"black"} />
                            </Link>
                        </div>
                        <div className='py-20 '>
                            <ul>
                                <li>
                                    <NavLink to={'profile'}>
                                        <div className='flex items-center gap-2 mb-3'>
                                            <UserOutlined />
                                            <span className='text-sm font-medium'>Profile</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/auth/login'}>
                                        <div className='flex items-center gap-2'>
                                            <LogoutOutlined />
                                            <span className='text-sm font-medium'>Logout</span>
                                        </div>
                                    </NavLink>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className='flex-1 bg-white rounded-l-3xl my-3 p-10'>
                        <Outlet />
                    </div>
                </div>
                </>
                : 
                <Loading />
            }
            
        </div >
    )
}

export default Settings
