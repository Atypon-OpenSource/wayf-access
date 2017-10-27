import Ember from 'ember';
import deleteMutation from 'wayf-apps/gql/mutations/deleteAdminUser';
import resetMutation from 'wayf-apps/gql/mutations/resetAdminUserPassword';
import listUsersQuery from 'wayf-apps/gql/queries/listAdminUsers';


export default Ember.Component.extend({
  apollo: Ember.inject.service(),
  classNames: ['list-item'],
  actions: {
     async delete (id) {
       console.log("Delete for :", id);
       let mutateObj = {
         mutation: deleteMutation,
         variables : {
           id: id
         },
         update: (store) => {
           const data = store.readQuery({query: listUsersQuery});
           data.listAdminUsers = data.listAdminUsers.filter(element => {
             return element.id !== id
           });
           store.writeQuery({query:listUsersQuery,data});
           console.log("Store updated");
         }
       }
       try {
          let reponse = await this.get('apollo').mutate(mutateObj,'deleteAdminUser');
          console.log("response:", reponse);
        }
        catch (err) {
          console.log('Error: ', err)
        }
     }
  }
});
