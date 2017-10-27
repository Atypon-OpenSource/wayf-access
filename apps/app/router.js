import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('me', function() {
    this.route('idp');
    this.route('activity');
  });
  this.route('admin', function() {
    this.route('registrations');
    this.route('registration', { path: '/registration/:id'}, function () {
      this.route('approve');
      this.route('reject');
    });
    this.route('publishers');
    this.route('publisher', { path: '/publisher/:id'});
    this.route('newpublisher', { path: '/publisher/new'});
    this.route('users');
    this.route('user', { path: '/user/:id'}, function () {
      this.route('reset');
    });
    this.route('newuser', { path: '/user/new'});
  });

  this.route('activate');
  this.route('adminlogin');
  this.route('404', { path: '/*path' });
  this.route('oops');

  this.route('sp', function() {
    this.route('register');
    this.route('info');
    this.route('thanks');
    this.route('members');
  });
});

export default Router;
