let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let HttpError = require('./source/models/httpError');
let userRoutes = require('./source/routes/userRoutes');
let adminRoutes = require('./source/routes/adminRoutes');
let requestRoutes = require('./source/routes/requestRoutes');

let app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

/*
*       ROUTING LOGIC
* */
app.use('/admin',adminRoutes);
app.use('/user',userRoutes);
app.use('/request',requestRoutes);

//in-case a wrong route is entered
app.use((req,res,next)=>{
    throw new HttpError('wrong route',401);
})

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message:  error.message || "An unknown error occurred!" });
});


mongoose.connect('mongodb+srv://randy:beauty@cluster0.yd9ey.mongodb.net/Hopital_system?retryWrites=true&w=majority')
                .then(()=>app.listen(5000,()=>console.log('app running on port 5000')))
                .catch(e=>console.log(e));