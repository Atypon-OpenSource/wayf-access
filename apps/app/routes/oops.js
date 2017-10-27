import Ember from 'ember';

export default Ember.Route.extend({
  redirected: false,
  beforeModel() {
    let url = this.get('router.url');
    console.log("Oops route: url:", url);
    if (url.match(/oops[\/]??$/) && !this.get('redirected')) {
      console.log("exactly matched oops :", url);
      this.set('redirected',true);
      // redirect to root if the user tries to go to this URL manually
      this.transitionTo('index');
    }
  }
});
