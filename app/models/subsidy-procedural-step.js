import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

const SUBSIDY_PROCEDURE_STEP_TYPE = {
  EXTERNALLY_PROCESSED:
    'http://lblod.data.gift/concepts/3ded9eab-ff5b-4a20-a095-0825de486f42',
};

export default class SubsidyProceduralStepModel extends Model {
  @attr description;
  @attr('uri-set') type;

  @belongsTo('period-of-time', {
    async: true,
    inverse: null,
  })
  period;

  @hasMany('deadline-extension', {
    async: true,
    inverse: 'subsidyProceduralStep',
  })
  deadlineExtensions;

  get isExternallyProcessed() {
    return (
      this.type &&
      this.type.includes(SUBSIDY_PROCEDURE_STEP_TYPE.EXTERNALLY_PROCESSED)
    );
  }
}
