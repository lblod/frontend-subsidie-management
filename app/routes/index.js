import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service session;
  @service router;

  beforeModel(transition) {
    this.router.transitionTo('subsidy.index');
  }
}
