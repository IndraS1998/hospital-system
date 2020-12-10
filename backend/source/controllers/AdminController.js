let Admin = require('../models/admins');
let HttpError = require('../models/httpError');

//middleware to create an admin
let createAdmin = async (req,res,next) =>{
    //collect data from user
    let {name,address,desc,sex,phone,password} = req.body;
    //check if admin doesn't already exist
    let foundAdmin;
    try{
        foundAdmin = await Admin.findOne({name});
    }catch (e) {
        return next(new HttpError('network error'),500);
    }
    if(foundAdmin){
        return next(new HttpError('user already exist'),401);
    }
    let newAdmin = new Admin({
        name,
        address,
        desc,
        sex,
        phone,
        password
    })
    //create admin
    try{
        await newAdmin.save();
    }catch (e) {
        return next(new HttpError('network error',500));
    }
    await res.json({admin:newAdmin}).status(200);
}

//middleware to log in an admin
let getAdmin = async (req,res,next) =>{
    let {name,password} = req.body;
    let foundAdmin;
    try{
        foundAdmin = await Admin.findOne({name});
    }catch (e) {
        return next(new HttpError('network error',500));
    }
    //check if admin exist
    if(!foundAdmin){
        return next(new HttpError('please enter good data',401));
    }

    if(foundAdmin.password === password){
        await res.json({admin:foundAdmin}).status(200);
    }else{
        return next(new HttpError('please enter good data ',401));
    }
}

exports.createAdmin = createAdmin;
exports.getAdmin = getAdmin;