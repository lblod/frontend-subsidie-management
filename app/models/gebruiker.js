import Model, { attr, hasMany } from '@ember-data/model';

export default class Gebruiker extends Model {
  @attr uri;
  @attr voornaam;
  @attr achternaam;

  @hasMany('account', { async: true, inverse: null }) account;
  @hasMany('bestuurseenheid', { async: true, inverse: null }) bestuurseenheden;

  get group() {
    return this.bestuurseenheden.at(0);
  }

  get fullName() {
    return `${this.voornaam} ${this.achternaam}`.trim();
  }
}
