import Model, { attr, belongsTo } from '@ember-data/model';

export default class CriteriaModel extends Model {
  @attr name;
  @attr uri;
  @belongsTo('subsidy-measure-offer', {
    async: true,
    inverse: 'criteria',
  })
  subsidyMeasureOffer;
}
