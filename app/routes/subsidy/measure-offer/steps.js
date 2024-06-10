import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SubsidyMeasureOfferStepsRoute extends Route {
  @service currentSession;
  @service store;

  async model({ series_id: seriesID }) {
    const series = await this.store.findRecord(
      'subsidy-measure-offer-series',
      seriesID,
      {
        include: [
          'active-application-flow.defined-steps.subsidy-procedural-step',
          'active-application-flow.defined-steps',
          'subsidy-measure-offer',
        ].join(','),
      }
    );
    return series;
  }

  async setupController(controller) {
    super.setupController(...arguments);
    await controller.setup.perform();
  }
}
