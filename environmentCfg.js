/**
 * Created by Grant Hutchinson(hutchgrant)
 * http://github.com/hutchgrant/react-boilerplate
 */

const fs = require('fs');
const crypto = require('crypto');

module.exports = {
  // Configure shared node environments
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
      'GOOGLE_RECAPTCHA_SECRET=' +
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
      '\n' +
      'FACEBOOK_CLIENT_ID=' +
      res.facebookClientID +
      '\n' +
      'FACEBOOK_CLIENT_SECRET=' +
      res.facebookClientSecret +
      '\n' +
      'TWITTER_CONSUMER_ID=' +
      res.twitterConsumerID +
      '\n' +
      'TWITTER_CONSUMER_SECRET=' +
      res.twitterConsumerSecret +
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

  // Configure baked React client environment
  configClient(res, cb) {
    let env = 'REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY=' + res.recaptchaKey;
    fs.truncate('client/.env', 0, function() {
      fs.writeFile('client/.env', env, function(err) {
        if (err) {
          return cb(err);
        }
        cb();
      });
    });
  },

  // Configure local dev node environment
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
