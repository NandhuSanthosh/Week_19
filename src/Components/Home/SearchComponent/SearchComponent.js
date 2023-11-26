import { SearchOutlined } from '@ant-design/icons'
import React from 'react'

const SearchComponent = () => {

    const searchTabData = [{
        first: "Starport",
        second: "Choose starport"
    }, {
        first: "City",
        second: "Choose city"
    }, {
        first: "Brand",
        second: "Choose brand"
    }, {
        first: "Host",
        second: "Choose host name"
    }]

  return (
    <div className='mx-52 mt-16 '>
        <div className='bg-white flex text-black py-3 pl-7 px-3 justify-between items-center'
            style={{
                borderRadius: '200px'
            }}>
            {
                searchTabData.map( (data, index) => (
                    <div key={index} className= {`pr-2 ${index == 0 || "border-l-2 border-gray-300 pl-3"}`}>
                        <div className='text-xs font-medium'>{data.first}</div>
                        <div className='text-sm text-gray-400 font-medium'>{data.second}</div>
                    </div>
                ))
            }

            <div className='flex justify-center align-center rounded-3xl ' 
            style={{
                backgroundColor: '#3b81ee',
                height: '50px', 
                width: '50px', 
                color: 'white', 
            }}>
                <SearchOutlined />
            </div>
        </div>
    </div>
  )
}

export default SearchComponent
