import * as multer from 'multer';

/**
 * write file to disk
 */
const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

/**
 * write file to buffer
 */
// const Storage = multer.memoryStorage();

export const upload = multer({ storage: Storage }).single("backdrop"); //Field name and max count