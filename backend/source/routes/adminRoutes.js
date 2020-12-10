let express = require('express');
let AdminController = require('../controllers/AdminController');

let router = express.Router();

//log in to admin status
router.post('/',AdminController.getAdmin);
//create admin
router.post('/create',AdminController.createAdmin);

module.exports = router;