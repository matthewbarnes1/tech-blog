const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api/index')
const blogRoutes = require('./api/blogRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
