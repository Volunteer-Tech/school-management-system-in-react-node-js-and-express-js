const { Router } = require('express');
const { getAllFaculty } = require('../controllers/faculty');

const router = Router();

router.get('/', getAllFaculty);

module.exports = router;