import User from './../models/User.js'

const handleLogout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) // No Content
    const refreshToken = cookies.jwt
    
    const foundUser = await User.findOne({refreshToken}).exec()
    if (!foundUser) { 
        res.clearCookie('jwt', { 
            sameSite: 'None', 
            secure: false, // secure: true
            httpOnly: true
        })
        return res.sendStatus(204)
    }
    
    foundUser.refreshToken = ''
    await foundUser.save()

    res.clearCookie('jwt', { 
        sameSite: 'None', 
        secure: false, // secure: true
        httpOnly: true
    })
    res.sendStatus(204)
}

export default { handleLogout }