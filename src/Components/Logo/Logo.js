import React from 'react'
import { RocketOutlined } from '@ant-design/icons'

const Logo = ({color}) => {
  return (
    <div className='items-center flex gap-1 '>
        <RocketOutlined
        style={{
            color,
            fontSize: "30px",
        }} />
        <div>
        <span className={`font-bold text-sm text-${color} block`}>ONE PIECE</span>
        <span className={`text-${color} -mt-1 text-xs block`}>rockets</span>
        </div>
    </div>
  )
}

export default Logo
