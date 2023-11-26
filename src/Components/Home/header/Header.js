import React from 'react'
import Nav from './Nav'
import Logo from '../../Logo/Logo'

const Header = () => {
  return (
    <div className='py-4'>
      <div className='flex justify-between mx-44'>
        <Logo color={'white'}/>
        <Nav />
      </div>
    </div>
  )
}

export default Header
