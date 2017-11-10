import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, post) {
    this._super(controller, post);
    this.controllerFor('application').set('coBrand', 'for service providers');
  },
  beforeModel() {
    let url = this.get('router.url');
    if (url.match(/sp[\/]??$/))
      this.transitionTo('sp.info');
  },
  actions: {
    formSubmitted(fields) {
      console.log("Action received at SP Route");
      this.transitionTo('ps.thanks');
    }
  }
});
