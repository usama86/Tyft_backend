const multer = require('multer');
const Datauri = require('datauri');
const DataURIParser = require("datauri/parser");
const path = require('path');

//multer.diskStorage() creates a storage space for storing files.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).any();

const dUri = new DataURIParser();

const dataUri = (req) => {
    // console.log(req.files[0].originalname);
    try{
        return dUri.format(path.extname(req.files[0].originalname).toString(), req.files[0].buffer);
    }
    catch(e)
    {
        console.log(e);
    }
	
};

module.exports = { upload, dataUri };
// , dataUri