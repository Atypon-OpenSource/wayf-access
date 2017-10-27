import Ember from 'ember';
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";
import query from 'wayf-apps/gql/queries/getUser';


export default Ember.Route.extend(RouteQueryManager,{
  apollo: Ember.inject.service(),
  model(params) {
    let variables = {
      id: params.id
    }
    return this.get('apollo').watchQuery({ query, variables }, 'getUser');
  },
  actions: {
    error(error, transition) {
      console.log("Error:", error)
      // let the route above handle the error
      return true;
    }
   }
});
