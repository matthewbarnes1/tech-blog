const router = require('express').Router();
// const {User, Post } = require('../Models');
// TODO: 
// * 1. Ensure that /dashboard can only be accessed by logged in users


router.get('/', async (req, res) => {
    try {
        res.render('dashboard', { 
            logged_in: req.session.logged_in 
        });
    } catch (error) {
        console.error("Error rendering dashboard:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
