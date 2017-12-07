import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('deactivate-wayf', 'Integration | Component | deactivate wayf', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{deactivate-wayf}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#deactivate-wayf}}
      template block text
    {{/deactivate-wayf}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
