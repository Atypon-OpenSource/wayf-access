import Ember from 'ember';
import RSVP from 'rsvp';
import mutation from 'wayf-apps/gql/mutations/adminLogin';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  apollo: Ember.inject.service(),
  restore: function () {
    return RSVP.resolve()
  },
  authenticate: function (username,password) {
     let mutateObj = {
      mutation,
      variables : {
        username: username,
        password: password
      }
    }
    return this.get('apollo').mutate(mutateObj,'adminLogin');
  },
});
