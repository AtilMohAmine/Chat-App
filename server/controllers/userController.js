import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js'

const __dirname = dirname(fileURLToPath(import.meta.url));

const uploadProfilePicture = async (req, res) => {
    const file = req.files.file
    
    const fileName = `${req.user.id}${path.extname(file.name)}`
    const uploadPath = path.join(__dirname, '..', 'public', 'uploads', 'profile-pictures', fileName);

    file.mv(uploadPath, async (err) => {
        if (err)
          return res.status(500).send(err);
        
        req.user.profilePicture = fileName
        const user = await User.findOne({_id: req.user.id}).exec()
        user.profilePicture = fileName
        await user.save()
        
        res.status(200).send({ status: 'success', msg: 'File uploaded' });
      });
}

export default { uploadProfilePicture }