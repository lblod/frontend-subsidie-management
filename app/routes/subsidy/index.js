/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';
import { inject as service } from '@ember/service';

export default class SubsidyIndexRoute extends Route.extend(
  DataTableRouteMixin
) {
  @service currentSession;
  @service store;
  async model() {
    return await this.store.findAll('subsidy-measure-offer', {
      include: [
        'series',
        'series.period',
        'series.active-application-flow.defined-steps',
        'series.active-application-flow.defined-steps.subsidy-procedural-step',
      ].join(','),
    });
  }
}
