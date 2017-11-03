import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  actions: {
    async activate () {
      console.log("Action: Activate");
      try {
        let createResponse = await Ember.$.post( {
          url: config.APP.restAPI + '/device',
          credentials: 'include'
        });
        console.log('Create Respose:', createResponse);
        this.sendAction("deviceActivated");
      } catch (err) {
        console.log("Error creating device:", err);
      }
    }
  }
});
