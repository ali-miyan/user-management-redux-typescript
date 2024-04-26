import multer from 'multer';

const storage = multer.diskStorage({
    destination: "frontend/public/userImages",
    filename: (req, file, callback) => {
        const filename = file.originalname;
        callback(null, filename)
    }
})

const profile = multer({ storage: storage });
export const uploadProfile = profile.single('image')
