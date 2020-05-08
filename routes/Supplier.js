import supplierService from '../services/SupplierService'; 
import CheckAuth from './../middlewae/checkAuth';
const multer = require('multer');


module.exports = (router) => {

	  router.post('/getsupplier', supplierService.getSupplier);
	  router.post('/updatestatus', supplierService.updateStatus);
	  router.post('/getschedule', supplierService.getSchedule);
	  router.post('/updateschedule', supplierService.updateSchedule);
	  router.post('/getcustomerreview', supplierService.getCustomerReview);
	  router.post('/getmenu', supplierService.getMenu);
	  router.post('/updatemenu', supplierService.updateMenu);
	return router;
};
//CheckAuth  