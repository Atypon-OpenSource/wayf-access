import Ember from 'ember';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import query from 'wayf-apps/gql/queries/listMembers';

export default Ember.Route.extend(RouteQueryManager,{
  apollo: Ember.inject.service(),
  model() {
    let variables= {
      limit: 500
    }
    return this.get('apollo').watchQuery({ query, variables }, 'listMembers').catch(error => console.log(error));
  },
  actions: {
    error(error, transition) {
      // let the route above handle the error
      return true;
    }
   }
});
