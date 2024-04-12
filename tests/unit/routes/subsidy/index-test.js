import { module, test } from 'qunit';
import { setupTest } from 'frontend-subsidie-management/tests/helpers';

module('Unit | Route | subsidy/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:subsidy/index');
    assert.ok(route);
  });
});
