const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');


// Temporary storage for original file upload
const tempStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'utils/temp'); // Temporary folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Multer middleware with temporary storage
const upload = multer({ storage: tempStorage });

const processAndStoreImage = (req, res, next) => {
    if(req.file) {
        if (!req.file) return next(new Error('No file uploaded.'));

        const tempPath = path.join(__dirname, 'temp', req.file.filename);
        const storagePath = path.join(__dirname, 'storage');
        const finalFilename = `${Date.now()}-resized-${req.file.originalname}`;

        if (!fs.existsSync(storagePath)) {
            fs.mkdirSync(storagePath);

        }

        sharp(tempPath)
            .resize(300, 300) // Resize to 300x300 (or any desired dimensions)
            .toFile(path.join(storagePath, finalFilename), (err, info) => {
                if (err) {
                    return next(err);
                }
                // Delete temporary file
                fs.unlinkSync(tempPath);
                req.file.processedFile = {
                    filename: finalFilename,
                    path: path.join(storagePath, finalFilename),
                    ...info,
                };
                next();
            });
    } else {
        return next()
    }
};

const deleteImage = (filename) => {
    console.log(filename);
    // const filePath = path.join(__dirname, 'utils/temp', filename);
    //
    // // Check if the file exists
    // fs.access(filePath, fs.constants.F_OK, (err) => {
    //     if (err) {
    //         return res.status(404).json({ error: 'File not found' });
    //     }
    //
    //     // Delete the file
    //     fs.unlink(filePath, (err) => {
    //         if (err) {
    //             return res.status(500).json({ error: 'Error deleting the file' });
    //         }
    //
    //         res.json({ message: 'File deleted successfully' });
    //     });
    // });
}

module.exports = { upload, processAndStoreImage };
