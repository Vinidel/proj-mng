const express = require('express');
const postUser = require('../handlers/postUser');
const patchUser = require('../handlers/patchUser');
const deleteUser = require('../handlers/deleteUser');
const getUsers = require('../handlers/getUsers');
const adminOnly = require('../middleware/adminOnly');

const router = express.Router();
router.get('/', getUsers);
router.post('/', adminOnly, postUser);
router.patch('/:userId', adminOnly, patchUser);
router.delete('/:userId', adminOnly, deleteUser);

module.exports = router;
