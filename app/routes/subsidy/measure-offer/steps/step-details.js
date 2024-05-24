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
    const step = await this.store.findRecord(
      'subsidy-application-flow-step',
      params.stepId,
      {
        include: ['form-specification', 'subsidy-procedural-step'].join(','),
      }
    );

    const forms = await this.store.query('subsidy-application-form', {
      filter: {
        'subsidy-application-flow-step': {
          ':id:': step.id,
        },
      },
    });

    const form = forms.at(0);

    return {
      step,
      form,
    };
  }

  async setupController(controller) {
    super.setupController(...arguments);
    await controller.setup.perform();
  }
}
