

export const name_update = "name_update";
export const email_update = "email_update"; 
export const password_update = "password_update";
export const confirmPassword_update = "confirmPassword_update";
export const file_update = "file_update";
export const submit = "submit";

export const nameUpdate = ( name ) => {
    return {
        type: name_update, 
        payload: name
    }
}
export const emailUpdate = ( email ) => {
    return {
        type: email_update, 
        payload: email
    }
}
export const passwordUpdate = ( password ) => {
    return {
        type: password_update, 
        payload: password
    }
}
export const confirmPasswordUpdate = ( cPassword ) => {
    return {
        type: confirmPassword_update, 
        payload: cPassword
    }
}

export const fileUpdate = (file) => {
    return {
        type: file_update, 
        payload: file
    }
}

export const submitAction = ( callback )=> {
    return {
        type: submit, 
        payload: callback
    }
}