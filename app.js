var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const dotenv = require('dotenv');
var http = require('http');
var fs = require('fs');
const cloudinary = require('./util/cloudconfig');
const upload = require('./util/multerconfig').upload;
const dataUri = require('./util/multerconfig').dataUri;

const router = express.Router();
dotenv.config();
const rateLimit = require('express-rate-limit');
// Database connection setup
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true });
const db = mongoose.connection; 
db.on('error', function(err) {
	console.error('connection error:', err);
	process.exit(1); 
});

db.once('open', function() {
	console.log('db connected');
});
 


var app = express();
app.use(cors());
app.options('*', cors());



//html page
router.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/adminpanel/index.html'));
  //__dirname : It will resolve to your project folder.
});
router.get('/table',function(req,res){
  res.sendFile(path.join(__dirname+'/adminpanel/table.html'));
  //__dirname : It will resolve to your project folder.
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));


// This will limit the api requests to 100 per minute per IP address
const apiLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 100
});
app.use('/api/', apiLimiter);


//let indexRouter = require('./routes/index');

let usersRouter = require('./routes/users')(express.Router());
let SupplierRouter  = require('./routes/Supplier')(express.Router());
let CusineRouter  = require('./routes/SevingCusine')(express.Router());
let MenuRouter = require('./routes/Menu')(express.Router());
let generalRouter = require('./routes/General')(express.Router());
let NotificationRouter = require('./routes/Notification')(express.Router());
//app.use('/', indexRouter);

//html
app.use('/', router);

app.use('/api/users', usersRouter);
app.use('/api/supplier', SupplierRouter);
app.use('/api/servingcusine',CusineRouter);
app.use('/api/menu',MenuRouter);
app.use('/api/general',generalRouter);
app.use('/api/notification',NotificationRouter);

app.post('/api/general/uploadImage', upload, (req, res, next) => {
  console.log('hi')
  const file = dataUri(req).content;
  // console.log('hissssss',file)
  cloudinary.uploads(file).then((result) => {
    res.json({ code:"ABT0000",url: result.url });

  }).catch(e=>{
    // console.log(e);
  })
  
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
