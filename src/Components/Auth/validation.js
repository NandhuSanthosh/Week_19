export const validateName = (name)=> {
    const fullNameRegex = /^([a-zA-Z]+(?: [a-zA-Z]+)?)(?: ([a-zA-Z]+))? ([a-zA-Z]+)$/;
    return fullNameRegex.test(name)
}
export const validateEmail = (email)=> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}
export const validatePassword = (password)=> {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password)
}