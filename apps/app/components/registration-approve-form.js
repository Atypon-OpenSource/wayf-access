import Ember from 'ember';
import mutation from 'wayf-apps/gql/mutations/createPublisher';
import listPublishersQuery from 'wayf-apps/gql/queries/listPublishers';
import listPendingRegistrationsQuery from 'wayf-apps/gql/queries/listPendingRegistrations';


export default Ember.Component.extend({
  apollo: Ember.inject.service(),
  classNames: ['full-width'],
  loading: "stop",
  actions: {
    async approveRegistration() {
      this.set('loading', "start");
      let registrationId = this.get('item.id');
      let variables = {
        name: this.get('item.name'),
        registrationId: registrationId,
        firstName: this.get('item.contact.firstName'),
        lastName: this.get('item.contact.lastName'),
        email: this.get('item.contact.email'),
        phone: this.get('item.contact.phone'),
        url: this.get('item.url'),
      }
      let mutateObj = {
        mutation,
        variables,
        update: (store, {data: {createPublisher}}) => {
          //update list of publishers
          let variables = {
            limit: 500
          };
          try {
            const dataPublisher = store.readQuery({query: listPublishersQuery, variables});
            console.log("Data for Publisher List:", dataPublisher)
            dataPublisher.listPublishers.push(createPublisher);
            console.log("Writting: ", dataPublisher)
            store.writeQuery({query:listPublishersQuery,dataPublisher});
          }
          catch (err) {
            // ignore the error
            // its juts that the publisher queyry didn't take place before the registration approval
            console.log("Error ", err);
          }

          //update list of pending registrations
          const data = store.readQuery({query: listPendingRegistrationsQuery});
          console.log("Data for Registration:", data)
          data.listPendingRegistrations = data.listPendingRegistrations.filter(element => {
            return element.id !== registrationId
          });
          console.log("Writting: ", data)
          console.log("Query: ", listPendingRegistrationsQuery)
          store.writeQuery({query:listPendingRegistrationsQuery,data});
          this.set('loading', "stop");
        }
      };
      try {
         let response = await this.get('apollo').mutate(mutateObj,'createPublisher');
         console.log("response:", response)
         this.sendAction('registrationApproved', response);
       }
       catch (err) {
         console.log('Error: ', err)
       }
    }
  },
});
