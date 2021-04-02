const GeneralService = require('../services/GeneralService');



// var storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, __dirname + './../uploads/')
// 	},
// 	filename: function (req, file, cb) {
//         // console.log(file);
// 	  cb(null,"test" + "." + file.mimetype.split("/")[1])
// 	  req.fileName = "test" + "." + file.mimetype.split("/")[1];
// 	}
//   })
   
//   const upload = multer({ storage: storage })

module.exports = (router) => {

      router.get('/getradius', GeneralService.getRadius);
      router.post('/addradius', GeneralService.AddRadius);
	  router.post('/updateradius', GeneralService.UpdateRadius);
      router.post('/delete', GeneralService.deleteData);
    //   router.post('/uploadImage',upload.single('file'),)
	 
	return router;
};