import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error(error, transition) {
      console.log("Error:", error)
      // let the route above handle the error
      return true;
    },
    publisherCreated (publisher) {
      console.log("Publisher Created event for:", publisher.id)
      this.transitionTo('admin.publisher', publisher.id)
    }
   }
});
