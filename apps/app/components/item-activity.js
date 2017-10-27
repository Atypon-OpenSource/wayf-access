import Ember from 'ember';

const ACTION_NAMES = {
  ADD_IDP: 'write',
  READ_IDP_HISTORY : 'read',
  REMOVE_IDP: 'delete'
};

export default Ember.Component.extend({
  classNames: ['list-item activity-item'],
  actionClass: Ember.computed('item.action', function (){
      const action = this.get('item.action');
      return ACTION_NAMES[action];
  }),
});
