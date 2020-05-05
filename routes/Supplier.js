import supplierService from '../services/SupplierService'; 
import CheckAuth from './../middlewae/checkAuth';
const multer = require('multer');


module.exports = (router) => {

	  router.post('/getsupplier', supplierService.getSupplier);
	return router;
};
//CheckAuth