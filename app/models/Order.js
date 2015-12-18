var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	menu_id:[{type: mongoose.Schema.Types.ObjectId, ref: 'Menu'}],
    time: {type: Number, default: (new Date()).getTime()},
    total: Number
});

module.exports =mongoose.model('Order',orderSchema);