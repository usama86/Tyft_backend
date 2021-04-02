const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');

//multer.diskStorage() creates a storage space for storing files.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).any();

const dUri = new Datauri();

const dataUri = (req) => {
    console.log(req);
	return dUri.format(path.extname(req.files[0].originalname).toString(), req.files[0].buffer);
};

module.exports = { upload, dataUri };