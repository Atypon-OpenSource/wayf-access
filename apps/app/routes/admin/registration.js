import Ember from 'ember';
import query from 'wayf-apps/gql/queries/getPendingRegistration';

export default Ember.Route.extend({
  apollo: Ember.inject.service(),
  async model(params) {
    let variables = {
      id: params.id
    }
    return await this.get('apollo').watchQuery({ query, variables }, 'getPendingRegistration');
  },
  actions: {
    registrationApproved () {
      console.log("Registration is approved!!");
      this.transitionTo("admin.registrations");
    },
    registrationRejected () {
      console.log("Registration is rejected!!");
      this.transitionTo("admin.registrations");
    },
    error(error, transition) {
      console.log("Error:", error)
      // let the route above handle the error
      return true;
    }
   }
});
