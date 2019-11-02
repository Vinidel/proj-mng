const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      name: 'Vinicius',
      role: 'ADMIN',
    },
  ]);
});
// router.get('/:id', getOrderDetails);
// router.post('/', createOrder);
// router.delete('/:id', deleteOrder);

module.exports = router;
