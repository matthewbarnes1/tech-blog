const User = require('./user');
const Blog = require('./blog'); // Assuming the file is named Blog.js. Also, note the typo you had with "Project".

// Set up associations
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',  // If a user is deleted, also delete all of their blog posts
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Blog };
