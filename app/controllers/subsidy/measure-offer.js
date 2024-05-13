import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default class SubsidyMeasureOfferController extends Controller {
  @service router;

  @tracked selected = null;
  @tracked options = [];

  async setup() {
    await this.loadOptions();
  }

  @action
  async loadOptions() {
    this.options = await this.model.series;
    this.latestSerie();
  }

  @action
  updateSelection(option) {
    this.selected = option;
  }

  @action
  routeBack() {
    this.router.transitionTo('subsidy.index');
  }

  latestSerie() {
    let latestSerie = null;
    let latestEndDate = null;

    this.options.forEach((option) => {
      const endDate = option.period.get('end');
      const formattedEndDate = moment(endDate).format('YYYYMMDD');
      if (!latestEndDate || formattedEndDate > latestEndDate) {
        latestEndDate = formattedEndDate;
        latestSerie = option;
      }
    });
    this.updateSelection(latestSerie);
  }
}
