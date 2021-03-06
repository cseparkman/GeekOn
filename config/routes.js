module.exports = function (app, passport, auth) {
  var user = require('../app/controllers/users_controller');
  app.get('/signup', user.new);
  app.post('/signup', user.create);
  app.get('/users/:user', user.show);
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', user.githubCallback);
  app.get('/auth/google', passport.authenticate('google')),
  app.get('/auth/google/callback', user.googleCallback);
  app.get('/geeks', user.index);
  app.get('/users/:user/edit', auth.ensureAuthenticated, auth.user.hasAuthorization, user.edit);
  app.put('/users/:user', auth.ensureAuthenticated, auth.user.hasAuthorization, user.update);

  //for those whose forgot his password to reset password with an email notify
  app.get('/users/:user/reset', auth.ensureAuthenticated, auth.user.hasAuthorization, user.reset_edit);
  app.put('/users/:user/reset/update', auth.ensureAuthenticated, auth.user.hasAuthorization, user.reset_update);
  app.get('/forgot', user.forgot);
  app.post('/send_forgot_email', user.send_forgot_email);
  app.get('/send_forgot_email/callback', user.reset_email_callback);

  //for a login user to reset his password
  app.get('/users/:user/direct_reset', auth.ensureAuthenticated, auth.user.hasAuthorization, user.direct_reset_edit);
  app.put('/users/:user/direct_reset/update', auth.ensureAuthenticated, auth.user.hasAuthorization, user.direct_reset_update);

  app.param('user', user.user);

  var session = require('../app/controllers/sessions_controller');
  app.get('/login', session.new);
  app.post('/login', session.create);
  app.get('/logout', session.destroy);

  var project = require('../app/controllers/projects_controller');
  var comment = require('../app/controllers/comments_controller');
  var article = require('../app/controllers/articles_controller');
  app.get('/projects/create', auth.ensureAuthenticated, project.new);
  app.post('/projects/create', auth.ensureAuthenticated, project.create);
  app.del('/projects/:projectId', project.destroy);
  app.get('/projects/:projectId', article.articles, project.show);
  app.get('/projects', article.articles, project.index);
  app.get('/projects/:projectId/edit', project.edit);
  app.put('/projects/:projectId', project.update);
  app.post('/projects/:projectId/create_comment', auth.ensureAuthenticated, comment.create);
  app.get('/projects/:projectId/join', auth.ensureAuthenticated, project.join);
  app.get('/projects/:projectId/star', auth.ensureAuthenticated, project.star);
  app.param('projectId', project.project);

  app.get('/articles/create', auth.ensureAuthenticated, auth.admin.hasAuthorization, article.new);
  app.post('/articles/create', auth.ensureAuthenticated, auth.admin.hasAuthorization, article.create);
  app.get('/articles/:articleId/destroy', auth.ensureAuthenticated, auth.admin.hasAuthorization, article.destroy);
  app.get('/articles/:articleId', article.articles, article.show);
  app.get('/articles', article.articles, article.index);
  app.get('/articles/:articleId/edit', auth.ensureAuthenticated, auth.admin.hasAuthorization, article.edit);
  app.put('/articles/:articleId', auth.ensureAuthenticated, auth.admin.hasAuthorization, article.update);
  app.post('/articles/:articleId/create_comment', auth.ensureAuthenticated, comment.create);
  app.param('articleId', article.article);

  var home = require('../app/controllers/home_controller');
  app.get('/', home.index);

  var details = require('../app/controllers/details_controller');
  app.get('/details', details.index);

  var about = require('../app/controllers/about_controller');
  app.get('/about', about.index);
};
