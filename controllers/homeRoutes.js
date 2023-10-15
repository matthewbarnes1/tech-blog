const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      req.session.loggedIn = true;
      return;
    }
    res.render('login');
  });


  router.get('/dashboard', async (req, res) => {
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
  
      res.render('dashboard', {
        User_username: req.session.User_username,
        blogs,
        loggedIn: req.session.loggedIn,
      });

    } catch (err) {
      res.status(500).json(err);
    }
    }
    );

module.exports = router;
