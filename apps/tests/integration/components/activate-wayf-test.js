import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('activate-wayf', 'Integration | Component | activate wayf', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{activate-wayf}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#activate-wayf}}
      template block text
    {{/activate-wayf}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
