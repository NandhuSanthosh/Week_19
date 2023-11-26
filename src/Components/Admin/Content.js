import { Button, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserDetails from '../Update/UserDetails';
import UpdateUser from './UpdateUser';
import UserListTable from './UserListTable';
import { dataFetched } from '../../redux/admin/reducer';

const Content = () => {


    const { baseUrl, dataSource } = useSelector( state => {
        return {
            baseUrl: state.general.baseUrl, 
            dataSource: state.admin.dataSource
        }
    })

    const dispatch = useDispatch();
    
    useEffect( ()=> {
        fetchUserData()
    }, [])

    function fetchUserData() {
        axios.get(baseUrl + '/admin/all_users', {
            withCredentials: true
        })
        .then( res => {
            console.log(res)
            dispatch( dataFetched(res.data.map( x => {
                return {
                    ...x, 
                    key: x._id
                }
            })))
        })
        .catch( err => {
            console.log(err)
        })
    }

    const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
    title: 'Actions',
    key: 'actions',
    render: (text, record) => (
      <span>
        <Button  size="" 
        onClick={() => handleButtonClick(record)}
        >
          Options
        </Button>
      </span>
    ),
  },
    ];

    function handleButtonClick(record) {
        showModal()
        setUser({...record})
    }

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

    function  blockUnblockUser(user) {
        axios.put(baseUrl + '/admin/block/user', {
            userId: user._id
        }, {
            withCredentials: true
        })
        .then( res => {
            console.log("here")
            let newDataList = dataSource.map(x => {
                if(x._id == user._id){
                    return {
                        ...x, 
                        isBlocked: res.data.isBlocked
                    }
                }
                return x;
            })
            console.log(newDataList, dataSource, newDataList == dataSource  )
            dispatch(dataFetched(newDataList))
        })
    }

    const [user, setUser] = useState({name: "", email: "", userProfile: ""});
  return (
    <main className='flex w-full overflow-hidden'>
        <UserListTable users = { dataSource } handleButtonClick = {handleButtonClick} blockUnblockUser = {blockUnblockUser} />
        <UpdateUser isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} user = {{...user}}  dataSource = {dataSource}/>
    </main>
  )
}

export default Content
