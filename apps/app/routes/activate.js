import Ember from 'ember';

export default Ember.Route.extend({
  redirected: false,
  beforeModel() {
    let url = this.get('router.url');
    console.log("URL :", url);
    console.log("Redirected :",this.get('redirected'));
    // if there
    if (url.match(/activate[\/]??$/) && !this.get('redirected')) {
      // prevent infinite redirections
      this.set('redirected',true);
      // redirect to root if the user tries to go to this URL manually
      this.transitionTo('me');
    }
  },
  actions: {
    deviceActivated () {
      console.log("Device is activated");
      this.transitionTo('me');
    },
  }
});
