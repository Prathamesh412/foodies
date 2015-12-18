var Company = require('../models/Company');
var User = require('../models/User');

exports.getCompanyById = function(req, res) {

    //get all companys based on id
    Company.findById(req.params.id, function(err, company) {
        if (err)
            res.json({
                "Error": err
            });
        else
            res.json(company);
    });
};


exports.getCompanys = function(req, res) {
  Company.find(function(err, companys) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(companys);
    }
  });
};

exports.putCompanyById= function(req,res){
  
  Company.findById(req.params.id,function(err,company){
    if(err)
      res.json({"Error":err})
    else
      company.name=req.body.name;
      company.password=req.body.password ;
      
      company.save(function(err) {
            if (err)
                res.json({
                    'ERROR': err
                });
            else
                res.json({
                    'success': company
                });
        });
    
  })
  
};

exports.postCompany = function(req, res) {

    var company = new Company({
        name: req.body.name,
        password: req.body.password
    });

    company.save(function(err) {
        if (err)
            res.json({
                'ERROR': err
            });
        else
            res.json({
                'success': company
            });
    });
};

exports.deleteCompany = function(req, res) {
    Company.findById(req.params.id, function(err, company) {
        if (err)
            res.json({
                'ERROR': err
            });
        else
            company.remove(function(err) {
                if (err)
                    res.json({'ERROR': err});
                else
                    res.json({'success': company});
            });
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////  Company authentication//////Please check////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////



var jwt = require('jwt-simple');
var tokenSecret="thetruthoflifeis";
var moment = require("moment");

//login
exports.postSigninCompany = function(req, res, next) {
  Company.findOne({ email: req.body.email }, function(err, company) {
    if (!company) return res.send(401, 'Company does not exist');
    company.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) return res.send(401, 'Invalid email and/or password');
      var token = createJwtToken(company);
      res.send({ token: token });
    });
  });
};

//Register
 exports.postSignupCompany = function(req, res, next) {
   console.log(req.body);
  var company = new Company({
    email: req.body.email,
    password: req.body.password
  });
  company.save(function(err) {
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
        req.company = decoded.company;
        return next();
      }
    } catch (err) {
      return res.send(500, 'Error parsing token');
    }
  } else {
    return res.send(401);
  };
};
 
function createJwtToken(company) {
  var payload = {
    company: company,
    iat: new Date().getTime(),
    exp: moment().add('days', 7).valueOf()
  };
  return jwt.encode(payload, tokenSecret);
}