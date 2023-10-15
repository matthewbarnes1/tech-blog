const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all blogs for the logged-in user
router.get('/', withAuth, async (req, res) => {
    try {
        const userBlogs = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            }
        });
        res.json(userBlogs);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new blog for the logged-in user
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.redirect('/dashboard');
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a blog post by ID
router.delete('/delete-blog/:id', withAuth, async (req, res) => {
    try {
        const blog = await Blog.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        if (blog) {
            await blog.destroy();
            res.status(200).json({ message: 'Blog post deleted successfully' });
        } else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a blog post by ID for editing
router.get('/edit-blog/:id', withAuth, async (req, res) => {
    try {
        const blog = await Blog.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        if (blog) {
            res.render('edit-blog', { blog: blog.get({ plain: true }) });
        } else {
            res.status(404).send('Blog post not found');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/update/:id', withAuth, async (req, res) => {
    try {
        const updatedBlog = await Blog.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
                }
            }
        );

        if (updatedBlog) {
            res.redirect('/dashboard');
        } else {
            res.status(404).send('Blog post not found');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
