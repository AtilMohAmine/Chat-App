import User from './../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' })
    
    const foundUser = await User.findOne({username: user}).exec()
    if (!foundUser) return res.sendStatus(401) // Unauthorized

    const match = await bcrypt.compare(pwd, foundUser.password)
    if (match) {
        // Create JWTs
        const accessToken = jwt.sign(
            { 
                "UserInfo": { 
                    "id": foundUser._id,
                    "username": foundUser.username,
                    "profilePicture": foundUser.profilePicture
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        )
        const refreshToken = jwt.sign(
            { "id": foundUser._id, "username": foundUser.username, "profilePicture": foundUser.profilePicture },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        foundUser.refreshToken = refreshToken
        await foundUser.save()

        res.cookie('jwt', refreshToken, { 
            sameSite: 'None', 
            secure: true,
            httpOnly: true, 
            maxAge: 24*60*60*1000 
        }) 
        res.json({ accessToken: accessToken, id: foundUser._id })
    }
    else
        res.sendStatus(401)
}

export default { handleLogin }