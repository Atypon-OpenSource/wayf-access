import Ember from 'ember';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import query from 'wayf-apps/gql/queries/getDevice';

export default Ember.Route.extend(RouteQueryManager,{
  apollo: Ember.inject.service(),
  setupController(controller, post) {
    this._super(controller, post);
    this.controllerFor('application').set('coBrand', 'inspector');
  },
  model() {
    return this.get('apollo').watchQuery({ query }, 'getDevice');
  },
  actions: {
   error(error, transition) {
     // in most cases the server will return all errors as graphQLerror
     if (error.graphQLErrors) {
       console.log("GQL:",error.graphQLErrors);
       if (error.graphQLErrors.length == 1 && ( error.graphQLErrors[0].message == '404' || error.graphQLErrors[0].message == '401')) {
         // when the deviceID is missing, the graphQLError array has one element
         // with '404' as the error message
         this.transitionTo('activate');
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
    let url = this.get('router.url');
    if (url.match(/me\/activity*/))
      this.transitionTo('me.activity');
    else {
      this.transitionTo('me.idp');
    }
  }
});
