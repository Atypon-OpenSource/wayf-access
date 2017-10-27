import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('registration-reject-form', 'Integration | Component | registration reject form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{registration-reject-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#registration-reject-form}}
      template block text
    {{/registration-reject-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
