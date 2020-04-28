import userService from '../services/userService'; 
import CheckAuth from './../middlewae/checkAuth';
module.exports = (router) => {
  /*
	router.post('/saveForumPost', forumService.addNewForum);	
	router.get('/getPopularPost', forumService.getPopular);
*/
	  router.get('/getUser', userService.getAllUser);
	  router.post('/signup', userService.signup);
	  router.post('/login', userService.login);
	return router;
};
//CheckAuth