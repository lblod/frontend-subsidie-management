import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';
import { inject as service } from '@ember/service';

export default class SubsidyMeasureOfferRoute extends Route.extend(DataTableRouteMixin) {
  @service currentSession;
  @service store;

  modelName = 'subsidy-measure-offer';

  async model({ id: measureOfferID }) {
    let groupId = this.currentSession.group.id;
    let response = await this.store.findRecord('subsidy-measure-offer', measureOfferID, {
      include: 'series',
      filter: {
        participations: {
          'participating-bestuurseenheid': {
            id: groupId,
          },
        },
      },
    });
    return response;
  }
}