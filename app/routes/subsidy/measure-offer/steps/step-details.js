import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SubsidyMeasureOfferStepsStepDetailsRoute extends Route {
  @service currentSession;
  @service store;

  queryParams = {
    stepId: {
      refreshModel: true,
    },
  };

  async model(params) {
    return await this.store.findRecord(
      'subsidy-application-flow-step',
      params.stepId,
      {
        include: ['form-specification', 'subsidy-procedural-step'].join(','),
      }
    );
  }

  async setupController(controller) {
    super.setupController(...arguments);
    await controller.setup.perform();
  }
}
