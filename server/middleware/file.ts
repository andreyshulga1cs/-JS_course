const multer = require('multer');

const storage = multer.diskStorage({
    destination(req: any, file: any, cb: any) {
        cb(null, 'uploads/')
    },
    filename(req: any, file: any, cb: any) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
})
const types = ['image/png', 'image/jpeg', 'image/jpg'];

const fileFilter = (req: any, file: any, cb: any) => {
    if (types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error(`Allowed formats - ${types.join(", ")} `))
    }
}

export default multer({storage, fileFilter})