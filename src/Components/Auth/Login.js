import { Button, Form, Input, message } from 'antd'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from './validation';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userNotLoggedIn } from './handleLogin';
import { adminNotLoggedIn } from './adminLoginHandler';

const Login = ({somethingelse, isAdmin}) => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const {baseUrl} = useSelector( state => {
        return {
            baseUrl : state.general.baseUrl
        }
    })

    useEffect( () => {
        if(!isAdmin) {
            userNotLoggedIn( ()=>{
                navigate("/", {replace: true})
            })
        }
        else{
            adminNotLoggedIn( ()=> {
                navigate('/admin/dashboard', {replace : true})
            })
        }
    }, [])

    const [email, setEmail] = useState("")
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true)

    const handleShowError = (text) => {
        message.error(text);
    };

    const handleLogin = (e) => {
        let url = baseUrl + (isAdmin ? '/admin/login': '/login')
        console.log(url)
        if(validateEmail(email) && validatePassword(password)){
                axios.post( url , {
                    email, password
                }, {
                    withCredentials: true,
                })
                .then( res => {
                    if(isAdmin)
                        navigate('/admin/dashboard')
                    else
                    navigate('/')
                })
                .catch( err => {
                    if(err.response.status == 400) {
                        handleShowError("Email or password incorrect.")
                    }
                    else{
                        handleShowError("Something went wrong")
                    }
                })
        }
    }

    function updateEmail(e){
        setEmail(e.target.value)
        setIsEmailValid(validateEmail(e.target.value))
    }
    function updatePassword(e){
        setPassword(e.target.value)
        setIsPasswordValid(validatePassword(e.target.value))
    }
    return (
        <div>
            <div className='mb-3'>
                <h2 className='font-bold text-3xl'>Login</h2>
                <span className='text-sm text-gray-300 font-medium'>Unleash the power of possibility!</span>
            </div>
            <Form
                layout="vertical"
            >
            <Form.Item name='email' label="Email" required style={{color: "red"}}>
                <Input  
                autoComplete="on"
                placeholder="Email" 
                value={email} 
                onChange={updateEmail}
                status={isEmailValid ? "" : "error"}/>
            </Form.Item>

            <Form.Item name='password' label="Password" required>
                <Input.Password
                placeholder="Password"
                visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                value={password}
                onChange={ updatePassword}
                status={isPasswordValid ? "" : "error"}
                />
            </Form.Item>
            
            <Button 
                style={{
                    backgroundColor: '#860021',
                    color: "white",
                    width: "100%", 
                    fontWeight: "bold", 
                    height: "40px"
                }}

                onClick={ handleLogin }
            > Login</Button>



            </Form>
            {
                isAdmin || 
                (<div className='mt-3 text-sm flex justify-end gap-2'>
                    <span>Don't have a account? </span>
                    <Link to={"../signin"} className='text-red-700'>Register</Link>
                </div>)
            }
        </div>
    )
}

export default Login
