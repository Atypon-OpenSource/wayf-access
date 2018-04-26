import Ember from 'ember';
import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import query from 'wayf-apps/gql/queries/listUserMembers';


export default Route.extend(RouteQueryManager,{
  apollo: Ember.inject.service(),
  model() {
    return this.get('apollo').watchQuery({ query }, 'listUserMembers').catch(error => console.log(error));
  },
  actions: {
    error(error, transition) {
      console.log("Error at /me/members: ", error);
      return true;
    }
   }
});
