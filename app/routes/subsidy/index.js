/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';
import { inject as service } from '@ember/service';

export default class SubsidyIndexRoute extends Route.extend(DataTableRouteMixin) {
  @service currentSession;
  @service store;
  async model() {
    let response = await this.store.findAll('subsidy-measure-offer');
    return response;
  }
}
