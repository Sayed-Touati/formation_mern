const express = require('express');
const { createUser, putUser, getUser, deleteUser, listUsers } = require('../controllers/user.controller')

const router = express.Router();

router.post('/create', createUser);
router.put('/update/:id', putUser);
router.get('/:id', getUser);
router.get('/', listUsers)
router.delete('/:id', deleteUser);

module.exports = router;