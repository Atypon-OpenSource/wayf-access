import Ember from 'ember';
import mutation from 'wayf-apps/gql/mutations/resetAdminUserPassword';


export default Ember.Component.extend({
  apollo: Ember.inject.service(),
  classNames: ['full-width'],
  loading: "stop",
  actions: {
    async reset (id) {
      let params = this.getProperties('password')
      let mutateObj = {
        mutation,
        variables : {
          id: id,
          password: params.password
        },
      };
      console.log("MutateObk:", mutateObj)
      try {
         let reponse = await this.get('apollo').mutate(mutateObj,'resetAdminUserPassword');
         console.log("response:", reponse)
         this.sendAction('passwordResetDone');
       }
       catch (err) {
         console.log('Error: ', err)
       }
     }
   },
});
