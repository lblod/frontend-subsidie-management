import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SubsidyMeasureOfferStepsRoute extends Route {
  @service currentSession;
  @service store;

  queryParams = {
    selectedId: {
      refreshModel: true,
    },
  };

  async model(params) {
    const series = await this.store.findRecord(
      'subsidy-measure-offer-series',
      params.selectedId,
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
}
