let mongoose = require('mongoose');

let adminSchema = new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    desc:{type:String,required:true},
    sex:{type:String,required:true},
    phone:{type:Number,required:true},
    password:{type:String,required:true}
});

module.exports = mongoose.model('admins',adminSchema);