import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'frontend-subsidie-management/config/environment';

export default class AuthLoginRoute extends Route {
  @service session;
  @service router;

  beforeModel() {
    if (isValidAcmidmConfig(ENV.acmidm)) {
      window.location.replace(buildLoginUrl(ENV.acmidm));
    } else {
      this.router.replaceWith('mock-login');
    }
  }
}

function isValidAcmidmConfig(acmidmConfig) {
  return Object.values(acmidmConfig).every(
    (value) =>
      typeof value === 'string' &&
      value.trim() !== '' &&
      !value.startsWith('{{')
  );
}
