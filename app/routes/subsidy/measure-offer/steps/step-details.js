import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { registerFormFields } from '@lblod/ember-submission-form-fields';
import ApplicationFormTableEditComponent from 'frontend-subsidie-management/components/rdf-form-fields/application-form-table/edit';
import ApplicationFormTableShowComponent from 'frontend-subsidie-management/components/rdf-form-fields/application-form-table/show';
import ClimateSubsidyCostsTableComponent from 'frontend-subsidie-management/components/rdf-form-fields/climate-subsidy-costs-table';
import EInclusionMaxValidatorComponent from 'frontend-subsidie-management/components/rdf-form-fields/e-inclusion-max-validator';
import EngagementTableEditComponent from 'frontend-subsidie-management/components/rdf-form-fields/engagement-table/edit';
import EngagementTableShowComponent from 'frontend-subsidie-management/components/rdf-form-fields/engagement-table/show';
import EstimatedCostEditComponent from 'frontend-subsidie-management/components/rdf-form-fields/estimated-cost-table/edit';
import EstimatedCostShowComponent from 'frontend-subsidie-management/components/rdf-form-fields/estimated-cost-table/show';
import ObjectiveTableEditComponent from 'frontend-subsidie-management/components/rdf-form-fields/objective-table/edit';
import ObjectiveTableShowComponent from 'frontend-subsidie-management/components/rdf-form-fields/objective-table/show';
import PlanLivingTogetherTableEditComponent from 'frontend-subsidie-management/components/rdf-form-fields/plan-living-together-table/edit';
import PlanLivingTogetherTableShowComponent from 'frontend-subsidie-management/components/rdf-form-fields/plan-living-together-table/show';
import AccountabilityTableEditComponent from 'frontend-subsidie-management/components/rdf-form-fields/accountability-table/edit';
import AccountabilityTableShowComponent from 'frontend-subsidie-management/components/rdf-form-fields/accountability-table/show';
import FinancingTotalsComponent from 'frontend-subsidie-management/components/rdf-form-fields/urban-renewal/financing-totals';

export default class SubsidyMeasureOfferStepsStepDetailsRoute extends Route {
  @service currentSession;
  @service store;

  constructor() {
    super(...arguments);

    this.registerTableFields();
  }

  async model({ step_id: stepID }) {
    return await this.store.findRecord(
      'subsidy-application-flow-step',
      stepID,
      {
        include: ['form-specification', 'subsidy-procedural-step'].join(','),
      }
    );
  }

  registerTableFields() {
    registerFormFields([
      {
        displayType:
          'http://lblod.data.gift/display-types/applicationFormTable',
        edit: ApplicationFormTableEditComponent,
        show: ApplicationFormTableShowComponent,
      },
      {
        displayType:
          'http://lblod.data.gift/display-types/climateSubsidyCostTable',
        edit: ClimateSubsidyCostsTableComponent,
      },
      {
        displayType:
          'http://lblod.data.gift/display-types/eInclusionMaxValidator',
        edit: EInclusionMaxValidatorComponent,
      },
      {
        displayType: 'http://lblod.data.gift/display-types/engagementTable',
        edit: EngagementTableEditComponent,
        show: EngagementTableShowComponent,
      },
      {
        displayType: 'http://lblod.data.gift/display-types/estimatedCostTable',
        edit: EstimatedCostEditComponent,
        show: EstimatedCostShowComponent,
      },
      {
        displayType: 'http://lblod.data.gift/display-types/objectiveTable',
        edit: ObjectiveTableEditComponent,
        show: ObjectiveTableShowComponent,
      },
      {
        displayType:
          'http://lblod.data.gift/display-types/planLivingTogetherTable',
        edit: PlanLivingTogetherTableEditComponent,
        show: PlanLivingTogetherTableShowComponent,
      },
      {
        displayType: 'http://lblod.data.gift/display-types/accountabilityTable',
        edit: AccountabilityTableEditComponent,
        show: AccountabilityTableShowComponent,
      },
      {
        displayType:
          'http://lblod.data.gift/display-types/urbanRenewalFinancingTotals',
        edit: FinancingTotalsComponent,
      },
    ]);
  }

  async setupController(controller, model) {
    super.setupController(controller, model);

    // Access the measure-offer model from the parent route
    let measureOfferModel = this.modelFor('subsidy.measure-offer');
    let measureOfferController = this.controllerFor('subsidy.measure-offer');
    controller.set('measureOfferModel', measureOfferModel);
    controller.set('measureOfferController', measureOfferController);
    await controller.setup.perform();
  }
}
