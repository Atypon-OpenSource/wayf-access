import Ember from 'ember';
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";
import query from 'wayf-apps/gql/queries/getPublisher';


export default Ember.Route.extend(RouteQueryManager,{
  apollo: Ember.inject.service(),
  async model(params) {
    let variables = {
      id: params.id
    }
    return await this.get('apollo').watchQuery({ query, variables }, 'getPublisher');
  },
  actions: {
    error(error, transition) {
      console.log("Error:", error)
      // let the route above handle the error
      return true;
    }
   }
});
