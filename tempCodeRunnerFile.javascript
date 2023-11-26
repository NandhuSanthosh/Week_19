const validateEmail = (name)=> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(name)
}

console.log(validateEmail("nandhusanthosh@gmail.com"))