import Ember from 'ember';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import query from 'wayf-apps/gql/queries/listAdminUsers';

export default Ember.Route.extend(RouteQueryManager, {
  apollo: Ember.inject.service(),
  model() {
    return this.get('apollo').watchQuery({ query }, 'listAdminUsers');
  },
  actions: {
    error(error, transition) {
      console.log("GQL:",error);
      // let the route above handle the error
      return true;
    }
   }
});
