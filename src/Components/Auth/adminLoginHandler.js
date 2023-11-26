import axios from "axios"



export const adminNotLoggedIn = (error) => {
    axios.get('http://localhost:5500' + '/admin/adminNotLoggedIn', {
        withCredentials: true,
    })
    .catch( err => {
        error()
    })
}

export const isadminLoggedIn = (error) => {
    axios.get('http://localhost:5500' + '/admin/isadminLogged', {
        withCredentials: true
    })
    .catch( err => {
        console.log(err)
        error()
    })
}