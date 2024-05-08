/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SubsidyMeasureOfferRoute extends Route {
  @service currentSession;
  @service store;

  async model({ id: measureOfferID }) {
    return await this.store.findRecord(
      'subsidy-measure-offer',
      measureOfferID,
      {
        include: 'series,criteria',
      }
    );
  }
  setupController(controller) {
    super.setupController(...arguments);

    controller.setup();
  }
}
