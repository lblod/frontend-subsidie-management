import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { restartableTask } from 'ember-concurrency';

export default class SubsidyMeasureOfferStepsController extends Controller {
  @tracked firstStep = null;
  @tracked lastStep = null;

  setup = restartableTask(async () => {
    const steps = await this.model.activeApplicationFlow.get(
      'sortedDefinedSteps'
    );

    this.firstStep = steps[0];
    this.lastStep = steps[steps.length - 1];
  });

  isFirstStep = (step) => {
    return step === this.firstStep;
  };

  isLastStep = (step) => {
    return step === this.lastStep;
  };
}
