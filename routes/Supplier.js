const supplierService = require('../services/SupplierService');
const multer = require('multer');


module.exports = (router) => { 
	  router.post('/getsupplier', supplierService.getSupplier);
	  router.post('/updatestatus', supplierService.updateStatus);
	  router.post('/getschedule', supplierService.getSchedule);
	  router.post('/updateschedule', supplierService.updateSchedule);
	  router.post('/getcustomerreview', supplierService.getCustomerReview);
	  router.post('/setfavorite', supplierService.setFavorite);
	  router.post('/setlocation', supplierService.setLocation);
	  router.post('/getfavoritetruck', supplierService.getFavoriteTruck);
	  router.post('/getfavorite', supplierService.getFavorite);
	  router.post('/addreview', supplierService.addReview);
	  
	  router.get('/getalltruck', supplierService.getAllTruck);
	  router.get('/getalllocation', supplierService.getAllLocation);
	  router.post('/updatetrucklogo', supplierService.updateTruckLogo)
	  router.post('/updatecoverimage', supplierService.updateCoverImage)
	  
	  router.post('/getsocialmedia', supplierService.getSocialMedia)
	  router.post('/updatesocialmedia', supplierService.updateSocialMedia)
	
	  router.post('/getservingcusine', supplierService.getServingCusine) 	
	  router.post('/updateservingcusine', supplierService.updateServingCusine)
	  router.post('/updatetruckinfo', supplierService.updateTruckInfo);
	  router.post('/updatetruck', supplierService.updateTruck)

	  router.post('/getcategory', supplierService.getCategory);
	  router.post('/updatecategory', supplierService.updateCategory);
	  
	return router;
}; 
//CheckAuth   