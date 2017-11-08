import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin,{
  setupController(controller, post) {
    this._super(controller, post);
    this.controllerFor('application').set('coBrand', 'for admins');
  },
});
