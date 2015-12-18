var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var passportConf = require('./config/passport');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var app = express();

mongoose.connect("mongodb://localhost:27017/foodees");
mongoose.connection.on('error',function(){
  console.log("Mongo Error in connection");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser());
app.use(express.static(__dirname+'/public'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.currentUser= req.user;
  next();
});

var companyController = require('./controllers/company');
var deliveryController = require('./controllers/delivery');
var menuController = require('./controllers/menu');
var orderController = require('./controllers/order');
var userController = require('./controllers/user');

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "2hjkeydwjfhusdifsb",
  store: new MongoStore({
    url:"mongodb://localhost:27017/foodees",
    autoReconnect: true
  })
}));

//routes
app.get('/api/users',userController.getUsers);
app.get('/api/users/:id',userController.getUserById);
app.post('/api/users',userController.postUser);
app.put('/api/users/:id',userController.putUserById);
app.delete('/api/users/:id',userController.deleteUser);

app.get('/api/companys',companyController.getCompanys);
app.get('/api/companys/:id',companyController.getCompanyById);
app.post('/api/companys',companyController.postCompany);
app.put('/api/companys/:id',companyController.putCompanyById);
app.delete('/api/companys/:id',companyController.deleteCompany);

//app.post('/api/companys/:id/menus',menuController.postMenu);
//app.get('/api/companys/:id/menus',menuController.getMenu);

app.post('/auth/signin',userController.postSignin);
app.post('/auth/signup',userController.postSignup);

app.post('/company/signin',companyController.postSigninCompany);
app.post('/company/signup',companyController.postSignupCompany);




app.listen('3000', function(){
  console.log("Server at port 3000");
});

module.exports = app;