let HttpError = require('../models/httpError');
let User = require('../models/users');

//      --creating a user /post request--
const createUser = async (req,res,next) =>{
    const {name,password,sex,age,phone,address} = req.body;
    let foundUser;
    try{
        foundUser = await User.findOne({name});
    }catch (e) {
        return next(new HttpError('something went wrong please try again later'),500);
    }

    if(foundUser){
        return next(new HttpError('user already exist'),402);
    }

    let newUser = new User({
        name,
        address,
        password,
        sex,
        age,
        phone
    })
    //save user
    try{
        await newUser.save();
    }catch (e) {
        return next(new HttpError(e,501));
    }
    //respond
    await res.json({user: newUser}).status(200);
};

//      --logging in a user/get request--
const getUserSingleUser = async (req,res,next) =>{
    let {name,password} = req.body;
    //verify is user exist
    let foundUser;
    try{
        foundUser = await User.findOne({name});
    }catch (e) {
        return next(new HttpError('network error please try again later'),500)
    }
    if(!foundUser){
        return next(new HttpError('please input correct data'),401);
    }
    //verify password
    if(foundUser.password !== password){
        return next(new HttpError('please input correct data',401))
    }
    await res.json({user:foundUser}).status(200);
};

exports.getSingleUser = getUserSingleUser;
exports.createUser = createUser;