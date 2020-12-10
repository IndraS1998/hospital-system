let HttpError = require('../models/httpError');
let Request = require('../models/requests');

//creating request
let createRequest = async (req,res,next) =>{
    //collect all data from body
    let {name,description} = req.body;
    let newRequest = new Request({
        name,
        affected : false,
        description
    })
    //save the data
    try{
        await newRequest.save();
    }catch (e) {
        return next(new HttpError('couldn\,t place consultation request, please try later'),500)
    }
    await res.json({message:'success'}).status(200);
};

//deleting request
let deleteRequest = async (req,res,next) =>{
    //get the request id from the user
    let {foundId} = req.body;
    //find if the id exists
    let foundRequest;
    try{
        foundRequest = await Request.findById(foundId);
    }catch (e) {
        return next(new HttpError('connection error please try again later'),500)
    }
    if(!foundRequest){
        return next(new HttpError('couldn\'t find the request'));
    }
    //delete
    try{
        await foundRequest.remove();
    }catch (e) {
        return next(new HttpError('server error'),500)
    }
    await res.json({message:'succeeded in deleting the request'}).status(200);
};

//editing request
let editRequest = async (req,res,next) =>{
    //get the request id from the user
    let {foundID} = req.body;
    //find if the id exists
    let foundRequest;
    try{
        foundRequest = await Request.findById(foundID).exec();
    }catch (e) {
        return next(new HttpError('connection error please try again later'),500)
    }
    if(!foundRequest){
        return next(new HttpError('couldn\'t find the request'),501);
    }
    //editing
    foundRequest.affected = !foundRequest.affected;
    try{
        await foundRequest.save();
        await res.json({message:'successfully edited the request'}).status(200);
    }catch (e) {
        return next(new HttpError('network error couldn\'t delete request'),500);
    }
};

//getting request
let getRequest = async (req,res,next) =>{
    let requests;
    try{
        requests = await Request.find().exec();
    }catch (e) {
        return next(new HttpError('couldn\'t get the requests'),500);
    }
    if(!requests){
        return next(new HttpError('no requests yet'),401);
    }
    try{
        await res.json({requests: requests.map(request => request.toObject({getters:true}))}).status(200);
    }catch (e) {
        return next(new HttpError('network error'),500);
    }
};

let getRequestById = async (req,res,next) =>{
    let name = req.body;
    let foundRequests;
    try{
        foundRequests = await Request.find({name}).exec()
    }catch (e) {
        return next(new HttpError('something went wrong'));
    }
    if(!foundRequests.length){
        return next(new HttpError('error accessing store'));
    }
    try{
        console.log(foundRequests);
        await res.json({requests: foundRequests.map(request => request.toObject({getters:true}))}).status(200);
    }catch (e) {
        console.log('here');
        return next(new HttpError('network access error'));
    }
}

exports.createRequest = createRequest;
exports.deleteRequest = deleteRequest;
exports.editRequest = editRequest;
exports.getRequest = getRequest;
exports.getRequestsById = getRequestById;