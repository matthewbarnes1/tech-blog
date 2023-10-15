const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    console.log("Logged in session:", req.session);
    res.render('login');
});

router.get('/dashboard', withAuth,  async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
              {
                model: User,
                attributes: ['username'],
              },
            ],
        });
        
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        console.log("Blogs retrieved:", blogs);
        res.render('dashboard', {
            user_username: req.session.user_username,
            blogs,
            loggedIn: req.session.loggedIn,
        });

    } catch (err) {
        console.error("Error retrieving blogs:", err);
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
              {
                model: User,
                attributes: ['username'],
              },
            ],
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', {
            blogs,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
