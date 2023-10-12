const router = require('express').Router();
const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./api/dashboardRoutes.js');
const userRoutes = require('./api/userRoutes.js');

router.use('/', homeRoutes);
router.use('/login', userRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;

