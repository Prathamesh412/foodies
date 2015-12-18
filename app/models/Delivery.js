var mongoose = require('mongoose');

var deliverySchema = new mongoose.Schema({
  
  items:[{type: mongoose.Schema.Types.ObjectId, ref: 'Menu'}],
  user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  date:Date
                                         
});

module.exports =mongoose.model('Delivert',deliverySchema);