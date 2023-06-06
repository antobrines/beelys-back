const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  db: {
    url: process.env.DB_URL,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  version: process.env.VERSION,
  environment: process.env.NODE_ENV,
  url: process.env.URL,
  url_front: process.env.URL_FRONT,
  email: {
    from: process.env.EMAIL_FROM,
    smtp: process.env.EMAIL_SMTP,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD
  },
  cache: {
    time_expire: 60,
    time_update: 600,
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  stripe: {
    secret: process.env.STRIPE_SECRET,
    public: process.env.STRIPE_PUBLIC
  },
};