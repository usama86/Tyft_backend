const jwt = require('jsonwebtoken');


module.exports =(req,res, next) =>{
    try{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token,"Bearer", null);
    req.userData = decoded;
    next();
    }catch(e)
    {
        return res.json({message:'Token unauthorized'})
    }

}