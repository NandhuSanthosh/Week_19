import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'

const Nav = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("here")
    setIsModalOpen(false);
    document.cookie = `userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    navigate('/auth/login')
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ul className='flex gap-4 items-center gap-10'>
        <li>
          <Link to={'/settings'}>
            <SettingOutlined
              style={{
                color: "white",
              }} />
          </Link>
        </li>
        <li>
          <Button
            style={{
              color: 'white',
              fontWeight: 'bold',
              backgroundColor: '#3b81ee',
              border: 'none',
              borderRadius: '20px'
            }}
            onClick={ showModal }
          >Logout</Button>
          <Modal title="Logout" 
          open={isModalOpen} 
          onOk={handleOk} 
          onCancel={handleCancel} 
          okText={'Logout'}
          okButtonProps={{
            style : {
              backgroundColor: '#3b81ee',
            },
          }}>
            <p>Do you really want to logout?</p>
          </Modal>
        </li>
      </ul>
    </div>
  )
}

export default Nav
