const userService = require('../services/userService');
const multer = require('multer');
var storage = multer.diskStorage({
	destination: function(req,file,cb)
	{
		cb(null, __dirname + './../uploads/')
	},
	filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
})
const fileFilter = (req, file, cb) =>{
	if(file.mimetype === 'images/jpeg' || file.mimetype === 'images/png')
		cb(null, true);
	else{
		cb(null,false);
	}

};

const upload = multer({
	storage:storage,
	limits:{
		fileSize: 1024 * 1024 * 10  //max 10 mb
	},
	// fileFilter:fileFilter
});


module.exports = (router) => {
  /*
	router.post('/saveForumPost', forumService.addNewForum);	
	router.get('/getPopularPost', forumService.getPopular);
*/
	  router.get('/getUser', userService.getAllUser);
	  router.post('/signup',upload.array('Image'), userService.signup);
	  router.post('/login', userService.login);
	  router.post('/updateuser',upload.array('Image'), userService.updateUser)
	  router.post('/getuser', userService.getUser)
	  

	  
	return router;
};
//CheckAuth