module.exports = [
  {
    path: '/',
    handler: rootRequire('app/routes/IndexRoute'),
  },
  {
    path: '/api',
    handler: rootRequire('app/routes/ApiRoute'),
  },
];
