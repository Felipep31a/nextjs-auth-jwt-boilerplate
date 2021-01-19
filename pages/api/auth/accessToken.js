import jwt from 'jsonwebtoken'
import Users from '../../../models/Users'
import { createAccessToken } from '../../../utils/generateToken'
import connectDB from '../../../utils/connectDB' 

export default async (req, res) => {

    try {
        await connectDB()
        const rf_token = req.cookies.refreshToken
        if (!rf_token) return res.status(400).json({ err: 'Faça o login!' })

        const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET)
        if (!result) return res.status(400).json({ err: 'Seu login expirou. Faça o login novamente!' })

        const user = await Users.findById(result.id)

        const access_token = createAccessToken({ id: user._id })

        res.json({
            access_token,
            user:{
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                root: user.root,
            }
        })

    } catch (error) {
        return  res.status(500).json({err:error})
    }

}