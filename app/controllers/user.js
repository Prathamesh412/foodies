var Company = require('../models/Company');
var User = require('../models/User');

var jwt = require('jwt-simple');
var tokenSecret="thetruthoflifeis";
var moment = require("moment");

var nodemailer = require('nodemailer');
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Mandrill',
    auth: {
        user: 'secrets.email',
        pass: 'email.password'
    }
});

exports.getUserById = function(req, res) {

    //get all users based on id
    User.findById(req.params.id, function(err, user) {
        if (err)
            res.json({
                "Error": err
            });
        else
            res.json(user);
    });
};


exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(users);
    }
  });
};

exports.putUserById= function(req,res){
  
  User.findById(req.params.id,function(err,user){
    if(err)
      res.json({"Error":err})
    else
      user.email=req.body.email;
      user.password=req.body.password;
      
      user.save(function(err) {
            if (err)
                res.json({
                    'ERROR': err
                });
            else
                res.json({
                    'success': user
                });
        });
    
  })
  
};

exports.postUser = function(req, res) {

    var user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save(function(err) {
        if (err)
            res.json({
                'ERROR': err
            });
        else
            res.json({
                'success': user
            });
    });
};

exports.deleteUser = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err)
            res.json({
                'ERROR': err
            });
        else
            user.remove(function(err) {
                if (err)
                    res.json({'ERROR': err});
                else
                    res.json({'success': user});
            });
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////
////// Authentication//////////////////////////////////////
/////////////////////////////////////////

//login
exports.postSignin = function(req, res, next) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) return res.send(401, 'User does not exist');
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) return res.send(401, 'Invalid email and/or password');
      var token = createJwtToken(user);
      res.send({ token: token });
    });
  });
};

//Register
 exports.postSignup = function(req, res, next) {
   console.log(req.body);
  var user = new User({
    email: req.body.email,
    password: req.body.password
  });
   
   /////sending Verification mailvia nodemailer///////////////////////
  rand=Math.floor((Math.random() * 100) + 54);
  host=req.get('host');
  link="http://localhost:3000/"+user.email+"/verify?id="+rand;
    //mail options
    mailOptions = {
      from: 'Foodees.com ✔ <sobingt@gmail.com>',
      to: req.body.email,
      subject: 'Account Creation',
      text: 'Below is a test link. Kindly click the link need to verify the account',
      html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error)
          return console.log(error);
        console.log(info);
    });
   //////////////////////Nodemailer ends here///////////////////////
   
  user.save(function(err) {
    if (err) return next(err);
    res.send(200);
  });
};


//Authentication
function ensureAuthenticated(req, res, next) {
  if (req.headers.authorization) {
    var token = req.headers.authorization.split(' ')[1];
    try {
      var decoded = jwt.decode(token, tokenSecret);
      if (decoded.exp <= Date.now()) {
        res.send(400, 'Access token has expired');
      } else {
        req.user = decoded.user;
        return next();
      }
    } catch (err) {
      return res.send(500, 'Error parsing token');
    }
  } else {
    return res.send(401);
  };
};
 
function createJwtToken(user) {
  var payload = {
    user: user,
    iat: new Date().getTime(),
    exp: moment().add('days', 7).valueOf()
  };
  return jwt.encode(payload, tokenSecret);
}
