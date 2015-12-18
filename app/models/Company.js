var mongoose = require('mongoose');

var companySchema = new mongoose.Schema({
  email:String,
  name:String,
  password:String,
  contact:Number,
  address: {
      building: { type: String, default: '' },
      streetname: { type: String, default: '' },
      landmark: { type: String, default: '' },
      pincode: { type: Number, default: '' }
    }
  
});

module.exports=mongoose.model('Company',companySchema);
