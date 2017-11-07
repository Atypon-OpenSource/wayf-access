import Ember from 'ember';
import mutation from 'wayf-apps/gql/mutations/deletePublisher';
import listPublishersQuery from 'wayf-apps/gql/queries/listPublishers';


export default Ember.Component.extend({
  apollo: Ember.inject.service(),
  classNames: ['full-width'],
  loading: "stop",
  actions: {
    async deletePublisher(param) {
      this.set('loading', "start");
      let mutateObj = {
        mutation,
        variables : {
          id: param.id
        },
      update: (store, {data: {deletePublisher}}) => {
          const data = store.readQuery({query: listPublishersQuery});
          data.listPublishers = data.listPublishers.filter(element => {
            return element.id !== param.id
          });
          store.writeQuery({query:listPublishersQuery,data});
          this.sendAction('publisherIsDeleted');
        }
      };
      try {
         let reponse = await this.get('apollo').mutate(mutateObj,'deletePublisher');
         console.log("response:", reponse)
         this.set('loading', "none");
       }
       catch (err) {
         console.log('Error: ', err)
         this.set('loading', "none");
       }
    }
  },
});
