import Model, { attr } from '@ember-data/model';

export default class TijdsintervalModel extends Model {
  @attr('date') begin;
  @attr('date') einde;
}
