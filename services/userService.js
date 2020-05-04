import { User } from '../models/userModel';
const jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');
export default {
	async getAllUser(req, res) {
		try {
			const posts = await User.find();
			res.send(posts);
		} catch (e) {
			console.log('error getting forum posts', e);
			res.json({ code: 'ABT0001' });
		}
	},
	async signup(req, res) {
		try {
			console.log(req.file)
			User.find({email:req.body.data.email}).exec()
			.then(async (user)=>{
				if(user.length>=1)
				{
					res.json({ code: 'Email Address already exist' });
				}
				else{
					let data = req.body.data;
					var hashedPassword=bcrypt.hashSync(data.password, 10);
					let userData;
					if(data.userType==='Supplier')
					{
						userData = {
							email: data.email,
							password: hashedPassword,
							profileName : data.profileName,
							profilePhoto: req.file.path,//img
							coverPhoto:	  req.file.path, //img
							phoneNumber:  data.phoneNumber,
							userType:	  data.userType,
							// email: {
							// 	type: String, 
							// 	required:true,
							// 	unique:true,
							// // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, res.json({ code: 'Email Address already exist' })]
							// },
							Truck:[
								{
								truckLogo:data.truckLogo,//img
								truckInfo:{
									truckName:data.truckName,
									businessDesc:data.businessDesc,
									truckContact:data.truckContact,
									truckEmail:data.truckEmail,
									truckCity:data.truckCity,
									truckWebsite:data.truckWebsite,
								},
								schedule:data.schedule,
								socialMedia:{
									facebook:data.facebook,
									instagram:data.instagram,
									twitter:data.twitter
								},
								selectedServingCusines:data.selectedServingCusines,
								Menu:data.Menu,
								status:'Close',
								rating:0,
								customerReview:[]
							}]
						};
					}
					else if(data.userType==='Customer'){
						userData = {
								email: data.email,
								password: hashedPassword,
								profileName : data.profileName,
								profilePhoto: data.profilePhoto,
								phoneNumber:  data.phoneNumber,
								userType:	  data.userType,
								Language: data.Language
							};
					}
					else{

					}
					
					
		
					const userDatas = new User(userData);
					await userDatas.save();
					res.json({ code: 'ABT0000' });
				}
			})
			// let reqBody = req.body;
		
		} catch (e) {
			res.json({ code: 'ABT0001' });
		}
	},	

	async login(req, res) {
		try {
			User.find({email:req.body.email}).exec()
			.then(async (user)=>{
				if(user.length<1)
				{
					res.json({ code: "Email Address doesn't already exist" });
				}
				bcrypt.compare(req.body.password,user[0].password,(err, result)=>{
					if(err)
					{
						res.json({message:'password failed'})
					}
					if(result)
					{
					const token=	jwt.sign({
							email:user[0].email,
							userId:user[0]._id,
							userType:user[0].userType,
							profileName:user[0].profileName
						},"Bearer",  //process.env.xyz
						{
							expiresIn: "1h"
						},

						)
						return res.json({message:'Auth Successful',token:token})
					}
					else{
						return res.json({message:'Auth Failed'})
					}
				})
			})
			// let reqBody = req.body;
		
		} catch (e) {
			console.log('error creating New user', e);
			res.json({ code: 'ABT0001' });
		}
	},	
};
