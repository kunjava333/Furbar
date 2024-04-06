const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    // Destination to store image
    destination: 'images',
    filename: (req, file, cb) => {
        // Extract the filename without extension
        const filename = path.parse(file.originalname).name;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });
module.exports = upload;
