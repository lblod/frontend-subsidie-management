import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class OrganizationModel extends Model {
  @attr uri;
  @attr naam;
  @attr alternatieveNaam;
  @attr mailAdres;
  @attr wilMailOntvangen;
  @attr isTrialUser;
  @attr viewOnlyModules;

  @belongsTo('organization-classification-code', {
    inverse: null,
    async: true,
    polymorphic: true,
  })
  classificatie;

  @hasMany('participation', {
    async: true,
    polymorphic: true,
    inverse: 'participatingOrganization',
  })
  participations;

  @hasMany('identifier', {
    inverse: null,
    async: true,
  })
  identifier;
}
