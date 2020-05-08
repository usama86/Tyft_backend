import CusineService from '../services/CusineService'; 



module.exports = (router) => {

	  router.get('/getcusines', CusineService.getCusines);

	return router;
};
//CheckAuth  