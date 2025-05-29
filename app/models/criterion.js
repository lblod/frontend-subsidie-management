import Model, { attr, belongsTo } from '@ember-data/model';

export default class CriterionModel extends Model {
  @attr name;

  @belongsTo('subsidy-measure-offer') subsidyMeasureOffer;
}
