/**
 * Created by Grant Hutchinson(hutchgrant)
 * http://github.com/hutchgrant/react-boilerplate
 */

const fs = require('fs');
const crypto = require('crypto');

module.exports = {
  configShared(res, cb) {
    let env =
      'MONGO_URI=' +
      res.mongo +
      '\n' +
      'REDIS_URL=' +
      res.redis +
      '\n' +
      'REDIS_PORT=' +
      res.redisPort +
      '\n' +
      'COOKIE_KEY=' +
      res.cookie +
      '\n' +
      'SESSION_KEY=' +
      res.session +
      '\n' +
      'TOKEN_SECRET=' +
      res.token +
      '\n' +
      'REDIRECT_DOMAIN=' +
      res.redirect +
      '\n' +
      'SITE_NAME=' +
      res.site +
      '\n' +
      'GOOGLE+RECAPTCHA_SECRET=' +
      res.recaptchaSecret +
      '\n' +
      'REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY=' +
      res.recaptchaKey +
      ' \n' +
      'GOOGLE_CLIENT_ID=' +
      res.googleClientID +
      '\n' +
      'GOOGLE_CLIENT_SECRET=' +
      res.googleClientSecret +
      '\n';

    fs.truncate('config/shared.env', 0, function() {
      fs.writeFile('config/shared.env', env, function(err) {
        if (err) {
          return cb(err);
        }
        cb();
      });
    });
  },

  configDev(res, cb) {
    let env =
      'MONGO_URI=' +
      res.mongo +
      '\n' +
      'REDIS_URL=' +
      res.redis +
      '\n' +
      'REDIS_PORT=' +
      res.redisPort +
      '\n' +
      'COOKIE_KEY=' +
      res.cookie +
      '\n' +
      'SESSION_KEY=' +
      res.session +
      '\n' +
      'TOKEN_SECRET=' +
      res.token +
      '\n' +
      'REDIRECT_DOMAIN=' +
      res.redirect +
      '\n' +
      'SITE_NAME=' +
      res.site +
      '\n';
    fs.truncate('config/dev.local.env', 0, function() {
      fs.writeFile('config/dev.local.env', env, function(err) {
        if (err) {
          return cb(err);
        }
        cb();
      });
    });
  },

  rand() {
    return crypto.randomBytes(64).toString('hex');
  }
};
