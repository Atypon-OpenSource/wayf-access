import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    formSubmitted() {
      // form was submitted
      this.transitionTo('sp.thanks');
    }
  }
});
