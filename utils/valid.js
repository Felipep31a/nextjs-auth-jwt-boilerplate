const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export function validateRegister(name = "", email = "", password = "", cpassword = ""){
    if(!name || !email || !password) return "Por favor adicione os campos"
    
    if(!validateEmail(email)) return "Email inválido!"

    if(password.length < 6) return "Senha muito curta!"

    if(password != cpassword) return "As senhas não conferem!"
}

export const validateEmail = (email) => EMAIL_REGEX.test(email)