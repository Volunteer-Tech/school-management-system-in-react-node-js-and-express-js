const { Router } = require('express');
const { getAllCommittee, addCommittee, searchCommittee, countCommittee } = require('../controllers/committee');

const router = Router();

router.get('/', getAllCommittee);
router.post('/add', addCommittee);
router.get('/search', searchCommittee);
router.get('/count', countCommittee);

module.exports = router;