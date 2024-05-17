/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default class SubsidyMeasureOfferCriteriaRoute extends Route.extend(
  DataTableRouteMixin
) {
  @service currentSession;
  @service store;

  queryParams = {
    selectedId: {
      refreshModel: true,
    },
  };

  async model(params) {
    const series = await this.store.findRecord(
      'subsidy-measure-offer-series',
      params.selectedId,
      {
        include: ['subsidy-measure-offer.criteria'].join(','),
      }
    );
    return series;
  }
}
