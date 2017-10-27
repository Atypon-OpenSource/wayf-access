import Ember from 'ember';
import mutation from 'wayf-apps/gql/mutations/forgetIdp';
import listIdpQuery from 'wayf-apps/gql/queries/listIdp';


export default Ember.Component.extend({
  classNames: ['list-item'],
  realDate: Ember.computed('lastActiveDate', function() {
    let d = Date.parse(this.get('lastActiveDate'));
    console.log("last:", this,get('lastActiveDate'))
    return d;
  }),
  avatar: Ember.computed('item.name', function() {
    let logo = this.get('item.logoUrl');
    let name = this.get('item.name');
    let avatar = name.split(' ').map(function (s) { return s.charAt(0); }).join('');
    console.log("Name:", name);
    console.log("Avatar:", avatar);
    return avatar;
  }),
  loading: "none",
  actions: {
    async forget() {
      this.set('loading', "start");
      const item = this.get('item');

      let mutateObj = {
        mutation,
        variables : {
          id: item.id
        },
        update: (store, {data: {forgetIdp}}) => {
          const data = store.readQuery({query: listIdpQuery});
          data.listIdp = data.listIdp.filter(element => {
            return element.id !== item.id
          });
          store.writeQuery({query:listIdpQuery,data});
          this.set('loading', "none");
        }
      };
      try {
         let reponse = await this.get('apollo').mutate(mutateObj,'forgetIdp');
         console.log("response:", reponse)
       }
       catch (err) {
         console.log('Error: ', err)
       }
    }
  },
  apollo: Ember.inject.service()
});
