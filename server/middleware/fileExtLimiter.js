import allowedFileTypes from '../config/allowedFileTypes.js';

const fileExtLimiter = (req, res, next) => {
        if (!req?.files?.file) {
            return res.status(400).json({ status: 'failed', msg: 'No file was uploaded.' });
        }

        const file = req.files.file
        const mimetype = file.mimetype

        if (!allowedFileTypes.profilePictures.includes(mimetype)) {
            const message = `Upload failed. Only ${allowedFileTypes.profilePictures.toString()} files allowed.`.replaceAll(",", ", ");

            return res.status(422).json({ status: 'failed', msg: message });
        }

        next()
}

export default fileExtLimiter