import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    const timeStamp = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    cb(null, `${timeStamp}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 11000000 },
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) !== '.csv') {
      return cb(new Error('Unsupported file format'))
    }
    return cb(null, true)
  }
})

const userUpload = upload.single('files')

export {
  userUpload
}
