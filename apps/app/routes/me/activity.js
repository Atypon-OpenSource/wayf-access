import Ember from 'ember';
import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import query from 'wayf-apps/gql/queries/listActivity';

export default Route.extend(RouteQueryManager, {
  apollo: Ember.inject.service(),
  skip: 0,
  loadingMore: false,
  async model() {
    let variables = {
      skip: 0,
      limit: 30
    }
    try {
      let activities = await this.get('apollo').watchQuery({ query, variables }, 'listActivity')
      return activities;
    }
    catch(err) {
      console.log("error")
    }
  },
  actions: {
    // todo: add load more button when API is enhanced to support skip
    // async moreActivities () {
    //   this.set('loadingMore',true);
    //   let skip = this.get('skip')+10;
    //   this.set('skip',skip)
    //   console.log("Skip:", skip);
    //   let variables = {
    //     skip: this.set('skip',skip),
    //     limit: 10
    //   }
    //   try {
    //     let activities = await this.get('apollo').watchQuery({ query, variables }, 'listActivity')
    //     this.set('loadingMore',false);
    //   }
    //   catch(err) {
    //     console.log("error loading more activities:", error);
    //   }
    // },
    error(error, transition) {
      // let the route above handle the error
      return true;
    }
   }
});
