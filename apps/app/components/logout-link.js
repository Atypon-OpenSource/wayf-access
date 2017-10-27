import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  classNames: ['logout'],
  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});
