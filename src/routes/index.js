const express = require('express');
const roleRoute = require('./role.route');
const faqRoute = require('./faq.route');
const allergenRoute = require('./allergen.route');
const productRoute = require('./product.route');
const boxRoute = require('./box.route');
const userRoute = require('./user.route');
const bannerRoute = require('./banner.route');
const orderRoute = require('./order.route');
const promoRoute = require('./promo.route');
const testRoute = require('./test.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/roles',
    route: roleRoute
  },
  {
    path: '/faqs',
    route: faqRoute
  },
  {
    path: '/allergens',
    route: allergenRoute
  },
  {
    path: '/products',
    route: productRoute
  },
  {
    path: '/boxes',
    route: boxRoute
  }, {
    path: '/users',
    route: userRoute
  }, {
    path: '/banners',
    route: bannerRoute
  }, {
    path: '/orders',
    route: orderRoute
  }, {
    path: '/promos',
    route: promoRoute
  }, {
    path: '/test',
    route: testRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;