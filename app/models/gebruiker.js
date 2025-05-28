/* eslint-disable ember/no-get, ember/classic-decorator-no-classic-methods */
import Model, { attr, hasMany } from '@ember-data/model';

export default class GebruikerModel extends Model {
  @attr voornaam;
  @attr achternaam;
  @attr rijksregisterNummer;

  @hasMany('account', { async: false, inverse: 'gebruiker' }) account;

  @hasMany('organization', {
    async: false,
    inverse: null,
    polymorphic: true,
  })
  organizations;

  get group() {
    return this.organizations.at(0);
  }

  // used for mock login
  get fullName() {
    return `${this.voornaam} ${this.achternaam}`.trim();
  }
}
