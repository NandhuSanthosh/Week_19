import React, { useEffect } from 'react'
import Header from './Header'
import Content from './Content'
import { useNavigate } from 'react-router-dom';
import { isadminLoggedIn } from '../Auth/adminLoginHandler';

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
      isadminLoggedIn( (Admin) => {
        navigate('/admin/auth/login');
      })
    }, [])

  return (
    <div>
      <Header />
      <Content />
    </div>
  )
}

export default Dashboard
