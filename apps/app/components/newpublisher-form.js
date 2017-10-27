import Ember from 'ember';
import mutation from 'wayf-apps/gql/mutations/createPublisher';
import listPublishersQuery from 'wayf-apps/gql/queries/listPublishers';


export default Ember.Component.extend({
  apollo: Ember.inject.service(),
  classNames: ['full-width'],
  loading: "stop",
  actions: {
    async createPublisher() {
      this.set('loading', "start");
      let variables = this.getProperties('name','email','firstName','lastName','phone');
      this.set('loading', "start");
      let mutateObj = {
        mutation,
        variables,
        update: (store, {data: {createPublisher}}) => {
          console.log("Update Store with:", createPublisher);
          console.log("Query:", listPublishersQuery)

          const data = store.readQuery({query: listPublishersQuery});
          console.log("DATA:", data)
          data.listPublishers.push(createPublisher);
          store.writeQuery({query:listPublishersQuery,data});
          this.set('loading', "stop");
        }
      };
      try {
         let response = await this.get('apollo').mutate(mutateObj,'createPublisher');
         console.log("response:", response)
         this.sendAction('publisherCreated', response);
       }
       catch (err) {
         console.log('Error: ', err)
       }
    }
  },
});
