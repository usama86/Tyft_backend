import MenuService from '../services/MenuService'; 


module.exports = (router) => {

	  router.post('/getmenu', MenuService.getSupplierMenu);
      router.post('/updatemenu', MenuService.updateMenu);
      router.get('/getallmenu', MenuService.getAllMenu);
	return router;
};
//CheckAuth  