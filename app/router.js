import EmberRouter from '@ember/routing/router';
import config from 'frontend-subsidie-management/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');

  this.route('legaal', function() {
    this.route('disclaimer');
    this.route('cookieverklaring');
    this.route('toegankelijkheidsverklaring');
  });
});
