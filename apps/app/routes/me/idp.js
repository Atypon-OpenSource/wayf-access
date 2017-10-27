import Ember from 'ember';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import query from 'wayf-apps/gql/queries/listIdp';

export default Ember.Route.extend(RouteQueryManager,{
  apollo: Ember.inject.service(),
  model() {
    return this.get('apollo').watchQuery({ query }, 'listIdp').catch(error => console.log(error));
  },
  actions: {
    error(error, transition) {
      // let the route above handle the error
      return true;
    }
   }
});
