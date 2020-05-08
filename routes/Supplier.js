import supplierService from '../services/SupplierService'; 
import CheckAuth from './../middlewae/checkAuth';
const multer = require('multer');


module.exports = (router) => {

	  router.post('/getsupplier', supplierService.getSupplier);
	  router.post('/updatestatus', supplierService.updateStatus);
	return router;
};
//CheckAuth