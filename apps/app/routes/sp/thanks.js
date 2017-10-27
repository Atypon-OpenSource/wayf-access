import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    console.log("Thanks Route")
    let url = this.get('router.url');
    console.log("URL :", url);
    // if (url.match(/thanks?\/?$/)) {
    //   console.log("Matched")
    //   // redirect to root if the user tries to go to this URL manually
    //   this.redirect('sp');
    // }
  }
});
