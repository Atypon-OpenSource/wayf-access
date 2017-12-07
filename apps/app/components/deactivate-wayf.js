import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  actions: {
    async deactivate () {
      console.log("Action: Deactivate");
      try {
        let createResponse = await Ember.$.ajax( {
          type: 'DELETE',
          url: config.APP.restAPI + '/mydevice',
          credentials: 'include'
        });
        console.log('Create Respose:', createResponse);
        this.sendAction("deviceDeactivated");
      } catch (err) {
        console.log("Error creating device:", err);
      }
    }
  }
});
