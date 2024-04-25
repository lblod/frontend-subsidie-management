import EmberRouter from '@ember/routing/router';
import { macroCondition, getOwnConfig } from '@embroider/macros';
import config from 'frontend-subsidie-management/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('switch-login');
  this.route('mock-login');

  this.route('auth', { path: '/authorization' }, function () {
    this.route('callback');
    this.route('login');
    this.route('logout');
    this.route('switch');
  });

  this.route('contact');

  this.route('legaal', function () {
    this.route('disclaimer');
    this.route('cookieverklaring');
    this.route('toegankelijkheidsverklaring');
  });

  this.route('subsidy', function () {
    this.route('index');
    this.route('measure-offer', { path:'subsidie-serie/:id'} );
    this.route('application-steps', {path: 'application-steps/:id'});
  });

  this.route('route-not-found', {
    path: '/*wildcard',
  });
});
