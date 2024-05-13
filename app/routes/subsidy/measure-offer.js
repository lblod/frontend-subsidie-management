/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SubsidyMeasureOfferRoute extends Route {
  @service currentSession;
  @service store;

  async model(params) {
    return await this.store.findRecord('subsidy-measure-offer', params.id, {
      include: 'series,criteria,series.period',
    });
  }

  async setupController(controller) {
    super.setupController(...arguments);
    await controller.setup();
  }
}
