import Route from '@ember/routing/route';

export default class SubsidyMeasureOfferStepsStepDetailsRoute extends Route {
  queryParams = {
    stepId: {
      refreshModel: true,
    },
  };
}
