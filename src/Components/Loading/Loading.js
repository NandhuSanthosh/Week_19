import { Spin } from 'antd'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Spin  tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </div>
  )
}

export default Loading
