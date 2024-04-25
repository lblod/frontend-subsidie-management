import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class SubsidyApplicationStepsController extends Controller {
  @service router;
  
  @action
  routeBack() {
    this.router.transitionTo('subsidy.measure-offer', this.model.subsidyMeasureOffer.id);
  }

  indexToDisplay(index) {
    // the order of the steps starts form 0
    return index + 1;
  }
}
