import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('newpubisher-form', 'Integration | Component | newpubisher form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{newpubisher-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#newpubisher-form}}
      template block text
    {{/newpubisher-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
