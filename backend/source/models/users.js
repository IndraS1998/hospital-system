let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    sex:{type:String,required:true},
    phone:{type:Number,required:true},
    password:{type:String,required:true},
    age:{type:Number,required:true}
});

module.exports = mongoose.model('users',userSchema);