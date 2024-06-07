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

  disableForm = true;

  graphs = {
    formGraph: FORM_GRAPH,
    metaGraph: META_GRAPH,
    sourceGraph: SOURCE_GRAPH,
  };
  sourceNode;
  formNode;
  formStore;

  setup = restartableTask(async () => {
    this.startDate = await this.model.step.subsidyProceduralStep
      .get('period')
      .then((period) => {
        return period.begin;
      });
    this.endDate = await this.model.step.subsidyProceduralStep
      .get('period')
      .then((period) => {
        return period.end;
      });
    await this.setupForm();
  });

  async setupForm() {
    this.form = await this.model.form;
    if (this.form) {
      this.formStore = new ForkingStore();
      this.formNode = this.formStore.any(
        undefined,
        RDF('type'),
        FORM('Form'),
        FORM_GRAPH
      );

      await this.retrieveForm(
        `/management-application-forms/${this.form.id}`,
        this.formStore,
        this.graphs
      );

      this.formNode = this.formStore.any(
        undefined,
        RDF('type'),
        FORM('Form'),
        FORM_GRAPH
      );
      this.sourceNode = new NamedNode(this.form.get('uri'));
    }
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
    const content = await response.json();
    store.parse(content.form, graphs.formGraph, 'text/turtle');
    store.parse(content.meta, graphs.metaGraph, 'text/turtle');
    store.parse(content.source, graphs.sourceGraph, 'text/turtle');
  }
}
