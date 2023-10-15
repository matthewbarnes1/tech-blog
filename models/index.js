const User = require('./user.js');
const Blog = require('./blog.js'); 

// Set up associations
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',  
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Blog };
