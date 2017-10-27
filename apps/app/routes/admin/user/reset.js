import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('admin.user');;
  },
  actions: {
    passwordResetDone () {
      this.transitionTo('admin.users');
    }
  }
});
