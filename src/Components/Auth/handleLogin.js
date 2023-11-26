import axios from "axios"



export const userNotLoggedIn = (error) => {
    axios.get('http://localhost:5500' + '/userNotLoggedIn', {
        withCredentials: true,
    })
    .catch( err => {
        error()
    })
}

export const isUserLoggedIn = (error, success) => {
    axios.get('http://localhost:5500' + '/isUserLogged', {
        withCredentials: true
    })
    .then( (res) => {
        console.log("this is the response ", res.data   )
        const {name, email, userProfile} = res.data
        success({name, email, userProfile})
    })
    .catch( err => {
        error()
    })
}