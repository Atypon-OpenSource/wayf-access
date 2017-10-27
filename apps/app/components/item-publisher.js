import Ember from 'ember';
import mutation from 'wayf-apps/gql/mutations/forgetIdp';
import listIdpQuery from 'wayf-apps/gql/queries/listIdp';


export default Ember.Component.extend({
  apollo: Ember.inject.service(),
  classNames: ['list-item'],
  loading: "none",
  // actions: {
  //   async delete() {
  //     this.set('loading', "start");
  //     const item = this.get('item');
  //     //console.log("Item:", item.id)
  //
  //     let mutateObj = {
  //       mutation,
  //       variables : {
  //         id: item.id
  //       },
  //       update: (store, {data: {forgetIdp}}) => {
  //         const data = store.readQuery({query: listIdpQuery});
  //         data.listIdp = data.listIdp.filter(element => {
  //           return element.id !== item.id
  //         });
  //         store.writeQuery({query:listIdpQuery,data});
  //         this.set('loading', "none");
  //       }
  //     };
  //     try {
  //        let reponse = await this.get('apollo').mutate(mutateObj,'forgetIdp');
  //        console.log("response:", reponse)
  //      }
  //      catch (err) {
  //        console.log('Error: ', err)
  //      }
  //   }
  //},
});
