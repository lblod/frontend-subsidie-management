import { belongsTo } from '@ember-data/model';
import OrganizationModel from './organization';

export default class Bestuurseenheid extends OrganizationModel {
  @belongsTo('bestuurseenheid-classificatie-code', {
    async: true,
    inverse: null,
  })
  classificatie;
}
