import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload, message } from 'antd'
import React, { useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


import { validateEmail, validateName, validatePassword } from './validation';
import { name_update, email_update, password_update, confirmPassword_update, file_update, submit,
        nameUpdate, emailUpdate, passwordUpdate, confirmPasswordUpdate, fileUpdate, submitAction} from './ActionCreator';
import { loggedIn } from '../../redux/user/reducer';

const normFile = (e) => {
    console.log("From normFile, ", e)
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const initialState = {
    name: "", 
    email: "", 
    password: "",
    confirmPassword: "", 
    userProfile: null,
    nameIsValid: true, 
    emailIsValid: true, 
    passwordIsValid: true, 
    confirmPasswordIsValid: true
}

function reducer(state, action){
    let isValid = true;
    switch (action.type) {
        case name_update:
            if(!state.nameIsValid) isValid = validateName(action.payload)
            return {
                ...state, 
                name: action.payload,
                nameIsValid: isValid
            }

        case email_update:
            if(!state.emailIsValid) isValid = validateEmail(action.payload)
            return {
                ...state, 
                email: action.payload,
                emailIsValid: isValid
            }

        case password_update: 
            if(!state.passwordIsValid) isValid = validatePassword(action.payload)
            return {
                ...state, 
                password: action.payload, 
                passwordIsValid: isValid
            }

        case confirmPassword_update: 
            if(!state.confirmPasswordIsValid) isValid = state.password === action.payload 
            return {
                ...state, 
                confirmPassword: action.payload,
                confirmPasswordIsValid: isValid
            }

        case file_update: 
            return {
                ...state, 
                userProfile: action.payload
            }

        case submit: 
            // validate form fields
            let updateState = {...state}
            updateState.nameIsValid = validateName(updateState.name)
            updateState.emailIsValid = validateEmail(updateState.email)
            updateState.passwordIsValid = validatePassword(updateState.password)
            updateState.confirmPasswordIsValid = updateState.password == updateState.confirmPassword


            if(updateState.nameIsValid && updateState.emailIsValid && updateState.passwordIsValid && updateState.confirmPasswordIsValid)
                action.payload()
            
            return updateState
    
        default:
            return state;
    }
}

const Signin = () => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState)
    const navigate = useNavigate();
    
    const {baseUrl} = useSelector( state => {
        return {
            baseUrl : state.general.baseUrl
        }
    })

    const userDispatch = useDispatch()

    const customRequest = ({ file, onSuccess, onError }) => {
        dispatch(fileUpdate(file))
        onSuccess();    
    };

    const handleShowError = (text) => {
        message.error(text);
    };
    

    function handleRegister() {
        return () => {
            const formData = new FormData();
            formData.append('name', state.name);
            formData.append('email', state.email);
            formData.append('password', state.password);
            if(state.userProfile) formData.append('userProfile', state.userProfile)


            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            axios.post(baseUrl + '/register', formData ,{
                withCredentials: true,
            })
            .then( response => {
                const user = response.data.user
                const trimeduser = {
                    name: user.name, 
                    email: user.email, 
                    userProfile: user.userProfile
                }
                userDispatch( loggedIn( trimeduser ))
                navigate('/', {replace: true})
            })
            .catch( err => {
                if(err.response.status == 409)
                    handleShowError("Email already associated with another account")
                else 
                    handleShowError('something went wrong')
            })
        }
    }


    return (
        <div>
            <div className='mb-3'>
                <h2 className='font-bold text-3xl'>Signin</h2>
            </div>
            <Form layout="vertical">

                <div className='flex justify-center'>
                    <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload 
                        listType="picture-card" 
                        // beforeUpload={() => true}
                        customRequest={customRequest}
                        maxCount={1} >
                            <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                </div>

                <Form.Item name='name' label="Name" required style={{color: "red"}}>
                    <Input 
                    autoComplete="on" 
                    placeholder="Enter name"
                    value={state.name}
                    onChange={(e)=>dispatch(nameUpdate(e.target.value))}
                    status={state.nameIsValid || 'error'}
                    />
                </Form.Item>

                <Form.Item name='email' label="Email" required style={{color: "red"}}>
                    <Input  
                    autoComplete="on"
                    placeholder="Email" 
                    value={state.email} 
                    onChange={(e)=>dispatch(emailUpdate(e.target.value))}
                    status={state.emailIsValid || 'error'}
                    />
                </Form.Item>

                <Form.Item name='password' label="Password" required
                    tooltip={{ title: 'Atlease 8 character long. Atlease one Uppercase, Lowercase, Special Charactors and Number.', icon: <InfoCircleOutlined /> }}>
                    <Input.Password
                    placeholder="Password"
                    visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                    value={state.password}
                    onChange={(e)=>dispatch(passwordUpdate(e.target.value))}
                    status={state.passwordIsValid || 'error'}
                    />
                </Form.Item>

            <Form.Item name='confirmPassword' label="Confirm Password" required>
                <Input.Password
                placeholder="Confirm Password"
                visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                value={state.confirmPassword}
                onChange={(e)=>dispatch(confirmPasswordUpdate(e.target.value))}
                status={state.confirmPasswordIsValid || 'error'}
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
                onClick={() => {
                    dispatch(submitAction( handleRegister() ))
                } }
            >Register</Button>



            </Form>

            <div className='mt-3 text-sm flex justify-end gap-2'>
                <span>Already have a account?</span>
                <Link to={"../login"} className='text-red-700'>Login</Link>
            </div>
        </div>
    )
}

export default Signin
