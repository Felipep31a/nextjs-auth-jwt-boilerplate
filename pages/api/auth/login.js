import bcrypt from 'bcrypt'
import Users from '../../../models/Users'
import connectDB from '../../../utils/connectDB'
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken'

export default async (req, res) => {

    switch (req.method) {
        case 'POST':
            await login(req, res)
            break
    }

}

export const login = async (req, res) => {
    try {
        await connectDB()
        const { email, password } = req.body
        console.log(email, password)

        const user = await Users.findOne({ email: email })
        if (!user) return res.status(400).json({ err: 'Este email não possui cadastro!' })

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({err: 'Senha incorreta!'})

        const access_token = createAccessToken({id: user._id})
        const refresh_token = createRefreshToken({id: user._id})

        console.log("Usuario logado com sucesso: ", user.email)

        res.json({
            access_token,
            refresh_token,
            user:{
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                root: user.root,
            }
        })
        
        res.status(201).end();

    } catch (error) {
        console.log(error)
        return res.status(500).json({ err: error }) 
    }
}