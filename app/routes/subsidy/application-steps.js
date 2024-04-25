import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SubsidyApplicationStepsRoute extends Route {
  @service currentSession;
  @service store;

  async model({ id: seriesID }) {
    const series = await this.store.findRecord('subsidy-measure-offer-series', seriesID, {
      include : [
        'active-application-flow.defined-steps.subsidy-procedural-step',
        'active-application-flow.defined-steps',
        'subsidy-measure-offer',
      ].join(',')
    });
    return series;
  }
}
