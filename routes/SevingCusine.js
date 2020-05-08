import CusineService from '../services/CusineService'; 



module.exports = (router) => {

	  router.post('/getcusines', CusineService.getCusines);

	return router;
};
//CheckAuth  