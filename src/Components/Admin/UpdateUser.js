import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { validateName } from '../Auth/validation';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updated } from '../../redux/user/reducer';
import { dataFetched } from '../../redux/admin/reducer';

const UpdateUser = ({handleOk, handleCancel, isModalOpen, user, dataSource}) => {
    console.log("user naem ", user.name, user)
    const initialFileList = [
    {
      uid: '-1',
      name: 'example.png',
      status: 'done',
      url: user?.userProfile, // Replace with the actual URL
    },
  ];

  const [name, setName] = useState(user.name)
  const [nameIsValid, setNameIsValid] = useState(true)
  const [isImageUpdated, setIsImageUpdated] = useState(false)
  const [image, setImage] = useState();

  const {baseUrl} = useSelector( state => {
    return {
        baseUrl : state.general.baseUrl
    }
  })

  const userDispatch = useDispatch();

   const customRequest = ({ file, onSuccess, onError }) => {
        setImage(file)
        onSuccess();    
    };

  function updateName(e) {
    setNameIsValid(validateName(e.target.value))
    setName(e.target.value)
  }

  function updateDetails(){
    if(validateName(name)){
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", user.email)
        if(isImageUpdated) formData.append("userProfile", image)

        console.log(baseUrl)
        axios.patch(baseUrl + '/admin/update/user', formData, {
            withCredentials: true
        })
        .then( res => {
            let {name, email, userProfile} = res.data
            userDispatch( updated({name, email, userProfile }))
            console.log("updated user", {name, email, userProfile})
            handleCancel();
            userDispatch( dataFetched(dataSource.map( x => {
                if(x._id == user._id) {
                    return {
                        ...x,
                        name, email, userProfile
                    }
                }
                return x;
            })))
        })
        .catch( err => {
            console.log("something went wrong", err,  err.response?.status)
            // show modal
        })
    }
  }

  useEffect( ()=> {
    console.log("name from useeffect",name)
  }, [name])

  console.log("name outside useEFfect", name)
  return (
    <>
    <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} 
    okButtonProps={{
        style: {
            display: "none"
        }
    }}>
          <Form layout="vertical">

                <div className='flex justify-center'>
                    <Form.Item valuePropName="fileList">
                        <Upload 
                        listType="picture-card" 
                        defaultFileList={ initialFileList }
                        customRequest={customRequest}
                        onChange={ () => setIsImageUpdated(true) }
                        maxCount={1} >
                            <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                </div>

                <Form.Item  label="Name" required style={{color: "red"}}>
                    <Input value={name} onClick={console.log(name)} onChange={ updateName } status={nameIsValid ? "" : "error"}/>
                </Form.Item>

                <Form.Item label="Email" style={{color: "red"}}>
                    <Input  
                    autoComplete="on"
                    placeholder="Email" 
                    value={user.email} 
                    readOnly={true}
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
                    onClick={updateDetails}
                >Update</Button>



            </Form> 
        </Modal>
     
    </>
  )
}

export default UpdateUser
