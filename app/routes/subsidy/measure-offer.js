/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';
import { inject as service } from '@ember/service';

export default class SubsidyMeasureOfferRoute extends Route.extend(
  DataTableRouteMixin
) {
  @service currentSession;
  @service store;

  async model({ id: measureOfferID }) {
    return await this.store.findRecord(
      'subsidy-measure-offer',
      measureOfferID,
      {
        include: 'series,criteria',
      }
    );
  }
}
