import bcrypt from 'bcrypt'
import Users from '../../../models/Users'
import connectDB from '../../../utils/connectDB'
import {validateRegister} from '../../../utils/valid'

export default async (req, res) => {

    switch (req.method) {
        case 'POST':
            await connectDB()
            await register(req, res)
            break
    }

}

export const register = async (req, res) => {
    try {

        const { name, email, password, cpassword } = req.body

        const errs = validateRegister(name, email, password, cpassword)
        if (errs) return res.status(400).json({ err: errs })

        const user = await Users.findOne({ email })
        if (user != null) return res.status(400).json({ err: 'Este email já possui cadastro!' })

        const passwordHash = await bcrypt.hash(password, 4)

        const newUser = new Users({ name, email, password:passwordHash })
        await newUser.save()

        console.log("Usuario criado: ", newUser)
        res.status(201).json({ success: true});

    } catch (error) {
        console.log(error)
        return res.status(500).json({ err: error }) 
    }
}