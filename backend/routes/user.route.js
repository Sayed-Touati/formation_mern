const express = require('express');
const { createUser, putUser, getUser, deleteUser } = require('../controllers/user.controller')

const router = express.Router();

router.post('/create', createUser);
router.put('/update/:id', putUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

module.exports = router;