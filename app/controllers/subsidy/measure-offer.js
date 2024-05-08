import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SubsidyMeasureOfferController extends Controller {
  sort = '-modified';
  page = 0;
  size = 20;

  @tracked selected = null;
  @tracked options = [];

  setup() {
    this.loadOptions()
    // this.loadOptions();
  }

  updateSelection () {

  }
  @action
  loadOptions() {
    this.options = this.model.series.map(option => {
      return {
        id: option.id, // Assuming option has an id property
        label: option.label  // Assuming option has a name property
      };
    });
    console.log('Model in Controller:', this.options);
  }

  @action
  updateSelection(option){
    this.selected = option;
  }
}
