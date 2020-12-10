let express = require('express');
let UserController = require('../controllers/UserController');

let router = express.Router();

router.post('/create',UserController.createUser);
router.post('/',UserController.getSingleUser);

module.exports = router;