const express = require('express');
const getProjects = require('../handlers/getProjects');
const adminOnly = require('../middleware/adminOnly');
const postProject = require('../handlers/postProject');
const patchProject = require('../handlers/patchProject');
const deleteProject = require('../handlers/deleteProject');

const router = express.Router();

router.get('/', getProjects);
router.post('/', adminOnly, postProject);
router.patch('/:projectId', adminOnly, patchProject);
router.delete('/:projectId', adminOnly, deleteProject);

module.exports = router;
