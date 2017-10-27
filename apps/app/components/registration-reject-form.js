import Ember from 'ember';
import mutation from 'wayf-apps/gql/mutations/rejectRegistration';
import listPendingRegistrationsQuery from 'wayf-apps/gql/queries/listPendingRegistrations';


export default Ember.Component.extend({
  apollo: Ember.inject.service(),
  classNames: ['full-width'],
  loading: "stop",
  actions: {
    async rejectRegistration() {
      this.set('loading', "start");
      let registrationID = this.get('item.id');
      let variables = {
        id: registrationID
      }
      let mutateObj = {
        mutation,
        variables,
        update: (store, {data: {listPendingRegistrations}}) => {
          const data = store.readQuery({query: listPendingRegistrationsQuery});
          data.listPendingRegistrations = data.listPendingRegistrations.filter(element => {
            return element.id !== registrationID
          });
          store.writeQuery({query:listPendingRegistrationsQuery,data});
          this.set('loading', "none");
        }
      };
       try {
          let response = await this.get('apollo').mutate(mutateObj,'rejectRegistration');
          console.log("response:", response)
          this.sendAction('registrationRejected', response);
        }
        catch (err) {
          console.log('Error: ', err)
        }
    }
  },
});
