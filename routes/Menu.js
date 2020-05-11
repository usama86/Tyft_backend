// import MenuService from '../services/MenuService'; 
const MenuService = require('../services/MenuService')

module.exports = (router) => {

	router.post('/getmenu', MenuService.getSupplierMenu);
      router.post('/updatemenu', MenuService.updateMenu);
      router.get('/getallmenu', MenuService.getAllMenu);
	return router;
};
//CheckAuth  