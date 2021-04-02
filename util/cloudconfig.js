const cloudinary = require('cloudinary');



cloudinary.config({ 
    cloud_name: 'hmrzthc6f', 
    api_key: '416752196531331', 
    api_secret: 'Sckg2t-RYRxxu1JgY_KWP7FDLak' 
  });
exports.uploads = (file) => {
	return new Promise((resolve) => {
		cloudinary.uploader.upload(
			file,
			(result) => {
				resolve({ url: result.url, id: result.public_id });
			},
			{ resource_type: 'auto' }
		);
	});
};