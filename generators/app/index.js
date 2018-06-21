'use strict';
/**
 * Modfied by Grant Hutchinson(hutchgrant)
 * http://github.com/hutchgrant/react-boilerplate
 */

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('underscore');
var _s = require('underscore.string');
var GitHub = require('../../github');
var env = require('../../environmentCfg');

var repo = 'hutchgrant/react-boilerplate';
var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

function rewrite(file, name, slug) {
  return file
    .replace(/({{#\s*=?\s*name\s*#}})/gi, name)
    .replace(/({{#\s*=?\s*slug\s*#}})/gi, slug);
}

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the ' +
          chalk.cyan('hutchgrant/react-boilerplate') +
          ' generator!'
      )
    );

    var prompts = [
      {
        name: 'userName',
        message: 'If I may ask, what is your name?',
        default: 'firstname lastname',
        validate: function(res) {
          return (
            !!res.match(/^([A-Za-z]{3,} [A-Za-z]{3,})$/i) ||
            "My apologies, but that doesn't appear to be a name."
          );
        }
      },
      {
        name: 'userEmail',
        message: 'If I may ask, what is your email?',
        validate: function(res) {
          return (
            !!res.match(emailRegex) ||
            "My apologies, but that doesn't apear to be a valid email."
          );
        }
      },
      {
        name: 'githubUser',
        message: 'If I may ask, what is your GitHub?',
        default: 'hutchgrant'
      },
      {
        name: 'name',
        message: 'If I may ask, what name have you chosen for your new app?',
        default: 'My Awesome App'
      },
      {
        type: 'confirm',
        name: 'environment',
        message: 'Would you like to set your environment now?'
      },
      {
        when: function(response) {
          return response.environment;
        },
        name: 'mongo',
        message: 'What is your MongoDB URI?',
        default: 'mongodb://127.0.0.1/reactboiler'
      },
      {
        when: function(response) {
          return response.environment;
        },
        name: 'redis',
        message: 'What is your Redis address?',
        default: '127.0.0.1'
      },
      {
        when: function(response) {
          return response.environment;
        },
        name: 'redisPort',
        message: 'What is your Redis Port?',
        default: '6379'
      },
      {
        when: function(response) {
          return response.environment;
        },
        name: 'redirect',
        message:
          'What address do you want to redirect clients to after they sign in to your API?',
        default: 'http://localhost:3000'
      },
      {
        when: function(response) {
          return response.environment;
        },
        name: 'recaptchaKey',
        message:
          'What is your Google Invisible Recaptcha Key? https://www.google.com/recaptcha',
        default: 'your-google-recaptcha-key'
      },
      {
        when: function(response) {
          return response.environment;
        },
        name: 'recaptchaSecret',
        message:
          'What is your Google Invisible Recaptcha Secret? https://www.google.com/recaptcha',
        default: 'your-google-recaptcha-secret'
      },
      {
        when: function(response) {
          return response.environment;
        },
        name: 'googleClientID',
        message:
          'What is your Google+ signin OAuth2.0 Client ID? https://github.com/hutchgrant/react-boilerplate/blob/master/docs/README_CONFIG.md#google-signin',
        default: 'your-google-client-id'
      },
      {
        when: function(response) {
          return response.environment;
        },
        name: 'googleClientSecret',
        message:
          'What is your Google+ signin OAuth2.0 Client Secret? https://github.com/hutchgrant/react-boilerplate/blob/master/docs/README_CONFIG.md#google-signin',
        default: 'your-google-client-secret'
      },
      {
        when: function(response) {
          return response.environment;
        },
        name: 'facebookClientID',
        message:
          'What is your Facebook signin OAuth2.0 Client ID? https://github.com/hutchgrant/react-boilerplate/blob/master/docs/README_CONFIG.md#facebook-signin',
        default: 'your-facebook-client-id'
      },
      {
        when: function(response) {
          return response.environment;
        },
        name: 'facebookClientSecret',
        message:
          'What is your Facebook+ signin OAuth2.0 Client Secret? https://github.com/hutchgrant/react-boilerplate/blob/master/docs/README_CONFIG.md#facebook-signin',
        default: 'your-facebook-client-secret'
      },
      {
        when: function(response) {
          return response.environment;
        },
        name: 'twitterConsumerID',
        message:
          'What is your Twitter signin OAuth2.0 Consumer ID? https://github.com/hutchgrant/react-boilerplate/blob/master/docs/README_CONFIG.md#twitter-signin',
        default: 'your-twitter-consumer-id'
      },
      {
        when: function(response) {
          return response.environment;
        },
        name: 'twitterConsumerSecret',
        message:
          'What is your Twitter signin OAuth2.0 Consumer Secret? https://github.com/hutchgrant/react-boilerplate/blob/master/docs/README_CONFIG.md#twitter-signin',
        default: 'your-twitter-consumer-secret'
      }
    ];

    this.prompt(
      prompts,
      function(props) {
        this.props = JSON.parse(
          '{"githubUser":"hutchgrant","repo":"hutchgrant/react-boilerplate","name":"generator-react-auth","generatorName":"react-auth","realname":"Grant Hutchinson","email":"h.g.utchinson@gmail.com","githubUrl":"https://github.com/hutchgrant"}'
        );
        for (var key in props) {
          if (props.hasOwnProperty(key)) {
            this.props[key] = props[key];
          }
        }
        this.props.slug = _s.slugify(this.props.name);
        this.props.githubUrl = [
          'https://github.com',
          this.props.githubUser,
          this.props.slug
        ].join('/');

        done();
      }.bind(this)
    );
  },

  writing: {
    everything: function() {
      var done = this.async();

      GitHub.getRepo(
        repo,
        function(err, files) {
          if (err) throw err;

          for (var path in files) {
            if (!files.hasOwnProperty(path)) continue;
            this.fs.write(
              path,
              rewrite(files[path], this.props.name, this.props.slug)
            );
          }
          done();
        }.bind(this)
      );
    },

    packageJsonRename: function() {
      var pkg = this.fs.readJSON('package.json');
      pkg.name = this.props.slug;
      pkg.repository = {};
      pkg.repository.url = pkg.homepage = this.props.githubUrl;
      pkg.bugs = {};
      pkg.bugs.url = this.props.githubUrl + '/issues';
      pkg.version = '1.0.0';
      pkg.author = {
        name: this.props.userName,
        email: this.props.userEmail,
        url: 'https://github.com/' + this.props.githubUser
      };

      this.fs.writeJSON('package.json', pkg);
    },

    install: function() {
      this.installDependencies();
      this.npmInstall(null, { prefix: 'client' });
    }
  },

  end: {
    environment: function() {
      var done = this.async();
      let res = {
        mongo: this.props.mongo || 'mongodb://127.0.0.1/reactboiler',
        redis: this.props.redis || '127.0.0.1',
        redisPort: this.props.redisPort || '6379',
        cookie: env.rand(),
        session: env.rand(),
        token: env.rand(),
        redirect: this.props.redirect || 'http://localhost:3000',
        site: this.props.name,
        recaptchaKey: this.props.recaptchaKey || 'some-google-recaptcha-key',
        recaptchaSecret:
          this.props.recaptchaSecret || 'some-google-recaptcha-secret',
        googleClientID: this.props.googleClientID || 'some-google-client-id',
        googleClientSecret:
          this.props.googleClientSecret || 'some-google-client-secret'
      };

      console.log(res);

      env.configShared(res, function(err) {
        env.configDev(res, function(err) {
          if (err) throw err;
          done();
        });
      });
    }
  }
});
