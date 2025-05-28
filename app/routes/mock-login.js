import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MockLoginRoute extends Route {
  @service() session;
  @service() store;

  queryParams = {
    page: {
      refreshModel: true,
    },
  };

  beforeModel() {
    this.session.prohibitAuthentication('subsidy.index');
  }

  model(params) {
    const filter = {
      provider: 'https://github.com/lblod/mock-login-service',
      gebruiker: { organizations: 'agentschap binnenlands bestuur' },
    };
    if (params.gemeente)
      filter.gebruiker = { organizations: params.gemeente };
    return this.store.query('account', {
      include: 'gebruiker.organizations',
      filter: filter,
      page: { size: 10, number: params.page },
      sort: 'gebruiker.achternaam',
    });
  }
}
