import React, { useEffect, useState } from 'react'
import Header from './header/Header.js'
import SearchComponent from './SearchComponent/SearchComponent.js'
import { isUserLoggedIn } from '../Auth/handleLogin.js'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading.js'
import { useDispatch } from 'react-redux'
import { loggedIn } from '../../redux/user/reducer.js'

const Home = () => {

    const [userLogged, setUserLogged] = useState(false)
    const userDispatch = useDispatch()

    let navigate = useNavigate();
    useEffect(() => {
      isUserLoggedIn( (user) => {
        navigate('/auth/login');
    },(user)=> {
        setUserLogged(true)
        userDispatch( loggedIn(user) )
      } )
    }, [])
    

    return (
        <div className='bg-black h-full text-white flex flex-col'
            style={{
                backgroundImage: `${userLogged ? 'url(images/stars-galaxy-1920x1080-10307.jpg)' : ""}`
            }}>

                {
                    userLogged ? 
                        <>
                            <Header />
                            <main>
                                <div className='flex-1 flex justify-center  pt-32'>
                                    <div className='flex flex-col items-center text-center'>
                                        <div className='text-2xl text-gray-500'>Explore the Universe</div>
                                        <p className='text-7xl w-3/4 font-medium'>Rent a Space Rocket in two clicks!</p>
                                    </div>
                                </div>
                                <SearchComponent />
                            </main>
                        </>
                    :
                        <Loading />

                }
        </div>
    )
}

export default Home
