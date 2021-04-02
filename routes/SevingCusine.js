const CusineService = require('../services/CusineService');


module.exports = (router) => {

	  router.get('/getcusines', CusineService.getCusines);
	  router.post('/addcusines', CusineService.addCusines);
	  router.post('/updatecusines', CusineService.updateCusine);
	  router.post('/deletecusines', CusineService.deleteCusines);

	return router;
};
//CheckAuth  