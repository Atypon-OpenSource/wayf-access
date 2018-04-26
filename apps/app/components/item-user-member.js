import Component from '@ember/component';


export default Component.extend({
  classNames: ['list-item activity-item'],
  statusText: Ember.computed('item.status', function (){
      const status = this.get('item.status');
      if (status)  // true
         return 'Allowed';
      else {
        return 'Blocked';
      }
  }),
  actionText: Ember.computed('item.status', function (){
      const status = this.get('item.status');
      if (status)  // true
         return 'Block';
      else {
        return 'Allow';
      }
  }),
});
