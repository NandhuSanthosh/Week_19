import { Button, Form, Image, Input, Modal } from 'antd'
import React, { useState } from 'react'
import UserDetails from '../../Update/UserDetails';
import {  useSelector } from 'react-redux';

const Profile = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  

  const {user} = useSelector( state => {
    console.log(state)
    return {
      user : { ...state.user}
    }
  })

  console.log(user)

  // let user = {
  //   name: "Nandhu Santhosh",
  //   email: "nandhusanthosh87@gmail.com", 
  //   userProfile: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  // }

  return (
    <div>
      <div className='h-64 relative overflow-hidden rounded-tl-2xl'>
        <div className='w-full bg-black h-1/2  object-contain bg-opacity-0'
        style={{
          backgroundImage: `url(images/dark-background-abstract-background-network-3d-background-3440x1440-8324.png)`,
        }}>

        <div className='absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center'>
              <Image
              className='rounded-3xl'
              width={150}
              src= {user.userProfile}
            />
        </div>
      </div>
        
      </div>

        <Form
         layout='vertical'
        >
          <div className='flex gap-4'>
            <Form.Item label="Name" className='flex-1'>
              <Input value={user.name} readOnly={true}/>
            </Form.Item>
            <Form.Item label="Email" className='flex-1'>
              <Input value={user.email  } readOnly={true}/>
            </Form.Item>
          </div>
          <Button onClick={ showModal } className='w-full bg-blue-400 text-white font-bold hover:text-white'>Update</Button>
        </Form>

        <UserDetails handleOk={handleOk} isModalOpen={isModalOpen} handleCancel={handleCancel} user = {user}/>

    </div>
  )
}

export default Profile
