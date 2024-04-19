import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { setContext, setUser } from '@sentry/ember';
import config from 'frontend-subsidie-management/config/environment';
import { SHOULD_ENABLE_SENTRY } from 'frontend-subsidie-management/utils/sentry';

const MODULE = {
  SUPERVISION: 'LoketLB-toezichtGebruiker',
  BERICHTENCENTRUM: 'LoketLB-berichtenGebruiker',
  BBCDR: 'LoketLB-bbcdrGebruiker',
  MANDATENBEHEER: 'LoketLB-mandaatGebruiker',
  LEIDINGGEVENDENBEHEER: 'LoketLB-leidinggevendenGebruiker',
  PERSONEELSBEHEER: 'LoketLB-personeelsbeheer',
  SUBSIDIES: 'LoketLB-subsidies',
  WORSHIP_MINISTER_MANAGEMENT: 'LoketLB-eredienstBedienaarGebruiker',
  EREDIENSTMANDATENBEHEER: 'LoketLB-eredienstMandaatGebruiker',
  PUBLIC_SERVICES: 'LoketLB-LPDCGebruiker',
  WORSHIP_DECISIONS_DB: 'LoketLB-databankEredienstenGebruiker',
  WORSHIP_ORGANISATIONS_DB: 'LoketLB-eredienstOrganisatiesGebruiker',
  VERENIGINGEN: 'abb_loketverenigingenapp',
  CONTACT: 'abb_organisatieportaal_rol_3d',
};

export default class CurrentSessionService extends Service {
  @service session;
  @service store;

  @tracked account;
  @tracked user;
  @tracked group;
  @tracked groupClassification;
  @tracked roles = [];

  async load() {
    if (this.session.isAuthenticated) {
      let accountId =
        this.session.data.authenticated.relationships.account.data.id;
      this.account = await this.store.findRecord('account', accountId, {
        include: 'gebruiker',
      });

      this.user = this.account.gebruiker;
      this.roles = this.session.data.authenticated.data.attributes.roles;

      let groupId = this.session.data.authenticated.relationships.group.data.id;
      this.group = await this.store.findRecord('bestuurseenheid', groupId, {
        include: 'classificatie',
        reload: true,
      });
      this.groupClassification = await this.group.classificatie;

      this.setupSentrySession();
    }
  }

  setupSentrySession() {
    if (SHOULD_ENABLE_SENTRY) {
      setUser({ id: this.user.id, ip_address: null });
      setContext('session', {
        account: this.account.id,
        user: this.user.id,
        group: this.group.uri,
        groupClassification: this.groupClassification.uri,
        roles: this.roles,
      });
    }
  }

}
