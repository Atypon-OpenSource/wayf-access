import Ember from 'ember';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

export default Ember.Route.extend(RouteQueryManager, {
  apollo: Ember.inject.service(),
  actions: {
    deviceDeactivated () {
      console.log("Device is deactivated");
      this.transitionTo('activate');
    },
    cancel(){
     this.transitionTo('me');
    }
  },
});
