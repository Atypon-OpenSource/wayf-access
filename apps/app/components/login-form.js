import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service('session'),
    classNames: ['centered-container'],
    loading: "stop",
    actions: {
       async authenticate () {
         this.set('loading', "start");
         let { username, password } = this.getProperties('username', 'password');
         try {
           await this.get('session').authenticate('authenticator:wayf', username, password);
          }
          catch(err) {
            console.log("Login Error:",err);
            this.set('errorMessage', "email address and password do not match");
          };
          this.set('loading', "stop");
        }
    }
});
