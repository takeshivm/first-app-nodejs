const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({storage});

router.get('/', (req, res, next) => {
    res.render('multer', {title: 'Upload ffiles with multer'});
});

router.post('/upload', upload.single('file'), (req, res, next) => {
    res.json(req.file);
});

router.post('/multiupload', upload.array('file[]',3), (req, res, next) => {
    res.json(req.files);
});

router.post('/multifields', upload.fields([
        {name: 'file', maxCount: 1},
        {name: 'gallery[]', maxCount: 8}
    ]),
    (req, res, next) => {
        res.json(req.files)
    }
)





module.exports = router;