/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default class SubsidyMeasureOfferCriteriaRoute extends Route.extend(
  DataTableRouteMixin
) {
  @service currentSession;

  async model() {
    let measureOfferModel = this.modelFor('subsidy.measure-offer');
    return measureOfferModel;
  }
}
