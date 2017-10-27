import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error(error, transition) {
      console.log("Error:", error)
      // let the route above handle the error
      return true;
    },
    adminUserCreated (user) {
      console.log("User Created event for:", user.id)
      this.transitionTo('admin.user', user.id)
    }
   }
});
