const { Router } = require('express');
const { getAllProjects, addProject, searchProject, countProject } = require('../controllers/projects');

const router = Router();

router.get('/', getAllProjects);
router.post('/add', addProject);
router.get('/search', searchProject);
router.get('/count', countProject);

module.exports = router;