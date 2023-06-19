const { Router } = require('express');
const { getAllStudents } = require('../controllers/students');

const router = Router();

router.get('/', getAllStudents);

module.exports = router;