let express = require('express');
let RequestController = require('../controllers/RequestController');

let router = express.Router();

router.post('/create',RequestController.createRequest);
router.post('/',RequestController.getRequestsById);
router.delete('/',RequestController.deleteRequest);
router.patch('/',RequestController.editRequest);
router.get('/',RequestController.getRequest);


module.exports = router;