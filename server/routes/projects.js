const express = require('express');
const getProjects = require('../handlers/getProjects');
const checkToken = require('../middleware/checkToken');

const router = express.Router();

router.get('/', checkToken, getProjects);


// router.get('/:id', getOrderDetails);
// router.post('/', createOrder);
// router.delete('/:id', deleteOrder);

module.exports = router;
