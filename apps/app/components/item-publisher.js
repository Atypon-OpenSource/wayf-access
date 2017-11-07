import Ember from 'ember';
import mutation from 'wayf-apps/gql/mutations/deletePublisher';
import listPublisherQuery from 'wayf-apps/gql/queries/listPublishers';


export default Ember.Component.extend({
  apollo: Ember.inject.service(),
  classNames: ['list-item'],
  loading: "none",
  actions: {
    async delete(param) {
      this.set('loading', "start");

      let mutateObj = {
        mutation,
        variables : {
          id: param
        },
        update: (store, {data: {deletePublisher}}) => {
          const data = store.readQuery({query: listPublisherQuery});
          data.listPublishers = data.listPublishers.filter(element => {
            return element.id !== param
          });
          store.writeQuery({query:listPublisherQuery,data});
          this.set('loading', "none");
        }
      };
      try {
         let reponse = await this.get('apollo').mutate(mutateObj,'deletePublisher');
         console.log("response:", reponse)
       }
       catch (err) {
         console.log('Error: ', err)
       }
    }
  },
});
