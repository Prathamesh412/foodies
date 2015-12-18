var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  phone_no: String,
  type:{type:String,default:'Customer'},
  address: {
      building: { type: String, default: '' },
      streetname: { type: String, default: '' },
      landmark: { type: String, default: '' },
      pincode: { type: Number, default: '' }
    }
});

module.exports =mongoose.model('User',userSchema);