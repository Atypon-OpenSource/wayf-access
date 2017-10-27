import Ember from 'ember';
import mutation from 'wayf-apps/gql/mutations/createAdminUser';
import listAdminUsersQuery from 'wayf-apps/gql/queries/listAdminUsers';


export default Ember.Component.extend({
  apollo: Ember.inject.service(),
  classNames: ['full-width'],
  loading: "stop",
  actions: {
    async createUser() {
      this.set('loading', "start");
      let variables = this.getProperties('email','firstName','lastName','phone', 'password');
      this.set('loading', "start");
      let mutateObj = {
        mutation,
        variables,
        update: (store, {data: {createAdminUser}}) => {
          console.log("Update Store with:", createAdminUser);
          console.log("Query:", listAdminUsersQuery)

          const data = store.readQuery({query: listAdminUsersQuery});
          console.log("DATA:", data)
          data.listAdminUsers.push(createAdminUser);
          store.writeQuery({query:listAdminUsersQuery,data});
          this.set('loading', "stop");
        }
      };
      try {
         let response = await this.get('apollo').mutate(mutateObj,'createAdminUser');
         console.log("response:", response)
         this.sendAction('adminUserCreated', response);
       }
       catch (err) {
         console.log('Error: ', err)
       }
    }
  },
});
