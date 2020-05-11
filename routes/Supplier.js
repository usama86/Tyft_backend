const supplierService = require('../services/SupplierService');
const multer = require('multer');


module.exports = (router) => {

	  router.post('/getsupplier', supplierService.getSupplier);
	  router.post('/updatestatus', supplierService.updateStatus);
	  router.post('/getschedule', supplierService.getSchedule);
	  router.post('/updateschedule', supplierService.updateSchedule);
	  router.post('/getcustomerreview', supplierService.getCustomerReview);

	  router.get('/getalltruck', supplierService.getAllTruck);
	return router;
};
//CheckAuth  