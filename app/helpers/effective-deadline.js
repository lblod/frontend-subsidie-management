import { helper } from '@ember/component/helper';

// Relationships must be loaded by the caller; .value() does not fetch them.
export function getEffectiveDeadline([consumption, flowStep]) {
  const proceduralStep = flowStep?.belongsTo('subsidyProceduralStep').value();
  const periodEnd = proceduralStep?.belongsTo('period').value()?.end;
  const extensions =
    proceduralStep?.hasMany('deadlineExtensions').value() ?? [];

  const participation = consumption?.hasMany('participations').value()?.[0];
  const organization = participation
    ?.belongsTo('participatingOrganization')
    .value();
  const organizationId = organization?.id;

  if (!extensions.length || !organizationId) return periodEnd;

  const applicable = extensions.filter((extension) =>
    extension
      .hasMany('audience')
      .value()
      ?.some(
        (audienceOrganization) => audienceOrganization.id === organizationId
      )
  );
  const extension = applicable.slice().sort((a, b) => b.created - a.created)[0];

  return extension?.valid ?? periodEnd;
}

export default helper(getEffectiveDeadline);
