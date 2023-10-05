const router = require('express').Router();
const { User } = require('../../Models');

// const { User } = require('../Models');
// const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        res.render('login', { 
            // logged_in: req.session.logged_in 
        });
    } catch (error) {
        console.error("Error rendering login page:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

