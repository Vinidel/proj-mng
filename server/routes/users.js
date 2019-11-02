const express = require('express');
const postUser = require('../handlers/postUser');

const router = express.Router();
router.get('/', (req, res) => {
  res.json([
    {
      name: 'Vinicius',
      role: 'ADMIN',
    },
  ]);
});
router.post('/', postUser);
// router.delete('/:id', deleteOrder);

module.exports = router;
