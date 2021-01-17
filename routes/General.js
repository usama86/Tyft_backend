const GeneralService = require('../services/GeneralService');


module.exports = (router) => {

      router.get('/getradius', GeneralService.getRadius);
      router.post('/addradius', GeneralService.AddRadius);
	  router.post('/updateradius', GeneralService.UpdateRadius);
    router.post('/delete', GeneralService.deleteData)
	return router;
};