import Ember from 'ember';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import mutation from 'wayf-apps/gql/mutations/withdrawConsent';


export default Ember.Route.extend(RouteQueryManager, {
  apollo: Ember.inject.service(),
  actions: {
    withdraw() {
      let mutateObj = {
        mutation, variables: {},
        update: (store, {data: {withdrawConsent}}) => {
          this.transitionTo('me');
        }

      };
      let response = this.get('apollo').mutate(mutateObj, 'withdraw');
      console.log(response);

    },
    cancel(){
      this.transitionTo('me');
    }
  },
});
