/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'wayf-apps',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {

    },
    apollo : {}
  };

  if (environment === 'development') {
    ENV.APP.wayfURL = 'http://localhost:3000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.APP.wayfURL = 'https://wayf-cloud-sandbox.literatumonline.com';
  }
  ENV.APP.restAPI = ENV.APP.wayfURL+ '/1';
  ENV.apollo.apiURL = ENV.APP.wayfURL+ '/graphql';
  ENV.apollo.requestCredentials = "include";

  // ember-simple-auth
  ENV['ember-simple-auth'] = {
    "authenticationRoute": "adminlogin",
    "routeIfAlreadyAuthenticated":"admin",
    "routeAfterAuthentication":"admin.registrations"
  };

  return ENV;
};
