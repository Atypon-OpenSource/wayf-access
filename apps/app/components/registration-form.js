import Ember from 'ember';
import mutation from 'wayf-apps/gql/mutations/registerPublisher';


export default Ember.Component.extend({
    apollo: Ember.inject.service(),
    classNames: ['centered-container'],
    loading: "stop",
    actions: {
       async register () {
         let variables = this.getProperties('name','email','firstName','lastName','phone','url');
         this.set('loading', "start");
         let mutateObj = {
           mutation,
           variables,
         };
         try {
            let reponse = await this.get('apollo').mutate(mutateObj,'registerPublisher');
            // let route handler handle the successfull form submission
            this.sendAction('formSubmitted');
            this.set('loading', "stop");
         }
          catch (err) {
            this.set('loading', "stop");
            this.set('errorMessage', err);
            console.log('Error: ', err)
          }
       }
    }
});
