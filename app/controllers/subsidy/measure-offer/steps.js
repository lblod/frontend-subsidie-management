import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { restartableTask } from 'ember-concurrency';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SubsidyMeasureOfferStepsController extends Controller {
  @service router;

  @tracked firstStep = null;
  @tracked lastStep = null;

  setup = restartableTask(async () => {
    const steps = await this.model.activeApplicationFlow.get(
      'sortedDefinedSteps'
    );

    this.firstStep = steps[0];
    this.lastStep = steps[steps.length - 1];
    this.transitionToDetails(this.lastStep);
  });

  @action
  transitionToDetails(step) {
    this.router.transitionTo('subsidy.measure-offer.steps.step-details', 
      step.id,
    );
  }

  isFirstStep = (step) => {
    return step === this.firstStep;
  };

  isLastStep = (step) => {
    return step === this.lastStep;
  };
}
