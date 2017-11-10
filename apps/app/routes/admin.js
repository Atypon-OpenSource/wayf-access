import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

//export default Ember.Route.extend(AuthenticatedRouteMixin);
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  setupController(controller, post) {
    this._super(controller, post);
    this.controllerFor('application').set('coBrand', 'for admins');
  },
  actions: {
    error(error, transition) {
      // in most cases the server will return all errors as graphQLerror
      if (error.graphQLErrors) {
        console.log("GQL:",error.graphQLErrors);
        if (error.graphQLErrors.length == 1 && error.graphQLErrors[0].message == '401') {
          // when the session is anauthorized, the response message is 401
          this.get('session').invalidate();
          // todo: we need to transition to the login page of the /admin ...
        }
        else {
          this.transitionTo('oops');
        }
      }
      else {
        this.transitionTo('oops');
      }
    }
  },
  afterModel() {
    // default route for /admin or /admin/ is the pending registrations
    let url = this.get('router.url');
    console.log("admin router after model: url:", url);
    if (url.match(/admin[\/]??$/)) {
      console.log("Exact match /admin");
      this.transitionTo('admin.registrations');
    }
  }
});
