const nodemailer = require('nodemailer');
const NodeCache = require('node-cache');
const config = require('../config/index');

const Cache = new NodeCache({
  stdTTL: config.cache.time_expire,
  checkperiod: config.cache.time_update,
});

const transport = nodemailer.createTransport({
  host: config.email.smtp,
  port: config.email.port,
  secure: false,
  auth: {
    user: config.email.username,
    pass: config.email.password,
  },
  tls: {
    rejectUnauthorized: false,
    ignoreTLS: false,
    requireTLS: true,
    minVersion: 'TLSv1',
  },
});

const sendEmail = async (to, subject, text) => {
  const msg = {
    from: config.email.from,
    to,
    subject,
    text,
  };
  await transport.sendMail(msg);
};

const sendHtmlEmail = async (to, subject, html) => {
  const msg = {
    from: config.email.from,
    to,
    subject,
    html,
  };
  await transport.sendMail(msg);
};

const GetTempURl = (emailUser) => {
  let CacheKey;
  const uuid = () => {
    return 'xxxxxxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const newLocal = true;
  while (newLocal) {
    CacheKey = uuid().trim().trimStart().trimEnd();
    if (Cache.has(CacheKey)) {
      continue;
    }
    break;
  }

  if (config.environment != 'prod') {
    console.log(CacheKey);
  }
  Cache.set(CacheKey, emailUser);
  return config.url_front + '/confirm?key=' + CacheKey;
};

const ReplaceUserNameAndUrl = async (stringHtmlMail, username, urlTempory) => {
  stringHtmlMail = stringHtmlMail.replace(
    '%%pseudo%%',
    username
  );
  return stringHtmlMail.replace(
    '%%link_confirmation%%',
    urlTempory
  );
};

module.exports = {
  sendEmail,
  sendHtmlEmail,
  GetTempURl,
  Cache,
  ReplaceUserNameAndUrl,
};