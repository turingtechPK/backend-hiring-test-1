const express = require('express');
const audioCallRoute = require('./audioCall.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/audioCall',
    route: audioCallRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;