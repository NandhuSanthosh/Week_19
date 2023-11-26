import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'


const Auth = () => {
  return (
    <div className=' h-full'>
      <div className='w-full h-full flex'>
        <div className='flex-1 overflow-hidden'>
          <img src="/images/monkey-d-luffy-one-piece-minimal-art-red-background-5k-8k-1920x1080-9031.jpg" alt=""
            className='w-full h-full object-cover object-top' />
        </div>
        <div className='p-2 flex-1 flex justify-center items-center'>
          <div className=' px-8 pb-10 pt-10 rounded-md w-3/4 border-2 border-gray-100 shadow-sm relative'>
            <Outlet/>
            <div className='absolute -top-28 left-0 pr-3 flex items-center gap-2'>
              <img src="/images/download.png" alt="" width={"27px"} />
              <span className='font-bold text-sm text-red-600'>ONE PIECE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
