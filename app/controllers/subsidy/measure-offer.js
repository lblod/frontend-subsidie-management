import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';
import { restartableTask } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default class SubsidyMeasureOfferController extends Controller {
  @service router;
  @service store;
  @tracked selected = null;
  @tracked options = [];
  @tracked startDate;
  @tracked endDate;
  @tracked selectedTab = 'steps';

  setup = restartableTask(async () => {
    await this.loadOptions();
  });

  @action
  async loadOptions() {
    this.options = await this.model.series;
    await this.latestSerie();
  }

  @action
  async updateSelection(option) {
    this.selected = await this.store.peekRecord(
      'subsidy-measure-offer-series',
      option.id
    );
    this.startDate = await this.startDateSeries(this.selected);
    this.endDate = await this.endDateSeries(this.selected);

    this.transitionToSteps();
  }

  @action
  routeBack() {
    this.router.transitionTo('subsidy.index');
  }

  @action
  transitionToSteps() {
    this.selectedTab = 'steps';
    console.log(this.selected.id);
    this.router.transitionTo('subsidy.measure-offer.steps', this.selected.id);
  }

  @action
  transitionToCriteria() {
    this.selectedTab = 'criteria';
    this.router.transitionTo(
      'subsidy.measure-offer.criteria',
      this.selected.id
    );
  }

  async latestSerie() {
    let latestSerie = null;
    let latestEndDate = null;

    await Promise.all(
      this.options.map(async (option) => {
        const endDate = await this.endDateSeries(option);
        if (endDate) {
          const formattedEndDate = moment(endDate).format('YYYYMMDD');
          if (!latestEndDate || formattedEndDate > latestEndDate) {
            latestEndDate = formattedEndDate;
            latestSerie = option;
          }
        }
      })
    );

    this.updateSelection(latestSerie);
  }

  // for the start date of the series we will look at the start date of the first step
  async startDateSeries(series) {
    const steps = await series
      .get('activeApplicationFlow')
      .then((activeFlow) => {
        return activeFlow.get('sortedDefinedSteps');
      });
    const periodFirstStep = await steps[0].subsidyProceduralStep.get('period');
    return periodFirstStep.begin;
  }

  // for the end date of the series we will look at the end date of the latest step
  async endDateSeries(series) {
    const steps = await series
      .get('activeApplicationFlow')
      .then((activeFlow) => {
        return activeFlow.get('sortedDefinedSteps');
      });
    const periodLastStep = await steps[
      steps.length - 1
    ].subsidyProceduralStep.get('period');
    return periodLastStep.end;
  }
}
