let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let requestSchema = new Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    affected:{type:Boolean,required: true}
});

module.exports = mongoose.model('Request',requestSchema);