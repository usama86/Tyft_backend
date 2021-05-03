const NotificationService = require('../services/NotificationService');


module.exports = (router) => {

      router.get('/getnotification', NotificationService.getNotification);
	return router;
};