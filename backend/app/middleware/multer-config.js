const multer = require('multer')


const upload = multer({
    limits: {
        filesize: 1000000
    },
    filefilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Merci d'utiliser une image"))
        }
        cb(undefined, true)
    }
})

