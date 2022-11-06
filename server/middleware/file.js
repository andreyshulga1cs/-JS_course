import multer from 'multer';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
})
const types = ['image/png', 'image/jpeg', 'image/jpg'];

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error(`Allowed formats - ${types.join(", ")} `))
    }
    // cb(null, true)
}

export default multer({storage, fileFilter})