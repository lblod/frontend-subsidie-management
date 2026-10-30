import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class DeadlineExtensionModel extends Model {
  @attr uri;
  @attr('datetime') valid;
  @attr description;
  @attr('datetime') created;

  @belongsTo('subsidy-procedural-step', {
    async: true,
    inverse: 'deadlineExtensions',
  })
  subsidyProceduralStep;

  @hasMany('organization', {
    async: true,
    inverse: null,
    polymorphic: true,
  })
  audience;
}
