import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { ForkingStore } from '@lblod/ember-submission-form-fields';
import { FORM, RDF } from '@lblod/submission-form-helpers';
import { restartableTask } from 'ember-concurrency';
import fetch from 'fetch';
import { NamedNode } from 'rdflib';

const FORM_GRAPH = new NamedNode('http://data.lblod.info/form');
const META_GRAPH = new NamedNode('http://data.lblod.info/metagraph');
const SOURCE_GRAPH = new NamedNode(`http://data.lblod.info/sourcegraph`);

export default class SubsidyMeasureOfferStepsStepDetailsController extends Controller {
  @service store;

  @tracked startDate;
  @tracked endDate;
  @tracked form;
  @tracked sourceNode;
  @tracked formNode;
  @tracked formStore;
  @tracked isExternallyProcessed;

  graphs = {
    formGraph: FORM_GRAPH,
    metaGraph: META_GRAPH,
    sourceGraph: SOURCE_GRAPH,
  };

  setup = restartableTask(async () => {
    const subsidyProceduralStep = await this.model.subsidyProceduralStep;
    this.isExternallyProcessed = subsidyProceduralStep.isExternallyProcessed;

    this.startDate = await subsidyProceduralStep
      .get('period')
      .then((period) => {
        return period.begin;
      });
    this.endDate = await subsidyProceduralStep.get('period').then((period) => {
      return period.end;
    });
    await this.setupForm();
  });

  async setupForm() {
    // If the subsidy is externally processed, there is no form to be retrieved
    if (this.isExternallyProcessed) return;

    let form = await this.model.formSpecification;

    this.formStore = new ForkingStore();
    this.formNode = this.formStore.any(
      undefined,
      RDF('type'),
      FORM('Form'),
      FORM_GRAPH
    );

    await this.retrieveForm(
      `/management-form-file?filename=${encodeURIComponent(
        form.get('filename')
      )}`,
      this.formStore,
      this.graphs
    );

    this.formNode = this.formStore.any(
      undefined,
      RDF('type'),
      FORM('Form'),
      FORM_GRAPH
    );
    console.log(this.formNode);
    this.sourceNode = new NamedNode(form.get('uri'));
  }

  async retrieveForm(url, store, graphs) {
    let response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/vnd.api+json' },
    });
    if (response.status != 200) {
      console.log(
        'error while retrieving the form at ',
        url,
        ' status code:',
        response.status
      );
      return;
    }
    const content = await response.text();
    store.parse(content, graphs.formGraph, 'text/turtle');
  }
}
