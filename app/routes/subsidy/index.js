/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';
import { inject as service } from '@ember/service';

export default class SubsidyIndexRoute extends Route.extend(DataTableRouteMixin) {
  @service currentSession;
  @service store;

  modelName = 'subsidy-measure-consumption';

  async model() {
    let groupId = this.currentSession.group.id;
    let response = await this.store.findAll('subsidy-measure-consumption', {
      include: 'subsidy-measure-offer',
      filter: {
        participations: {
          'participating-bestuurseenheid': {
            id: groupId,
          },
        },
      },
    });

    let uniqueSubsidyMeasureOffers = new Map();
    let uniqueSubsidyMeasureConsumptions = response.slice().filter(consumption => {
      let offerId = consumption.belongsTo('subsidyMeasureOffer').id();
      if (!uniqueSubsidyMeasureOffers.has(offerId)) {
        uniqueSubsidyMeasureOffers.set(offerId, true);
        return true;
      }
      return false;
    });

    return uniqueSubsidyMeasureConsumptions;
  }
}
