import User from './../models/User.js'
import bcrypt from 'bcrypt'

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' })
    
    // Check for dublicate usernames
    const dublicate = await User.findOne({username: user}).exec()
    if (dublicate) return res.sendStatus(409) // Conflict

    try {
        // Encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10)

        const result = await User.create({ 
            "username": user, 
            "password": hashedPwd
        })
        
        res.status(201).json({ 'success': `New user ${user} created!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

export default { handleNewUser }