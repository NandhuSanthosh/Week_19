import React, { useState } from 'react'
import Logo from '../Logo/Logo'
import Search from 'antd/es/input/Search'
import { useDispatch, useSelector } from 'react-redux'
import { dataFetched, searchInput } from '../../redux/admin/reducer'
import axios from 'axios'
import { Button, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const { baseUrl, searchKey } = useSelector( state => {
        return {
            baseUrl : state.general.baseUrl, 
            searchKey : state.admin.searchKey
        }
    })

    const dispatch = useDispatch();
    function handleSearch(){
        console.log(searchKey)
        axios.post(baseUrl + '/admin/search_users', {
            searchKey
        }, {
            withCredentials: true,
        })
        .then( res => {
            dispatch( dataFetched(res.data) )
        })
        .catch( err => {
            console.log(err.message)
        })
    }

    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        console.log("here")
        setIsModalOpen(false);
        document.cookie = `adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        navigate('/admin/auth/login')
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <header>
            <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Logo color={"white"} /> 
                    <div>
                        <Search
                            placeholder="input search text"
                            allowClear
                            enterButton="Search"
                            size="large"
                            className='bg-blue-500 rounded-lg'
                            value={searchKey}
                            onChange={ (e) => dispatch(searchInput(e.target.value))}
                            onSearch = { handleSearch}
                        />
                    </div>
                    <div class="flex items-center lg:order-2">
                        <Button 
                        className="text-white border-none font-bold"
                        onClick={ showModal }>
                            Log out
                        </Button>
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
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
