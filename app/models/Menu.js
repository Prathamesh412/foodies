var mongoose = require('mongoose');

var menuSchema = new mongoose.Schema({
  name:String,
  description:String,
  price:Number,
  type:String,
  selection:String,
  category:String,
  sub_items:[{
    name:String,
    quantity:{type:Number,default:1},
    cost:Number
  }],
  companyId={type: mongoose.Schema.Types.ObjectId, ref: 'Company'}
});

module.exports =mongoose.model('Menu',menuSchema);