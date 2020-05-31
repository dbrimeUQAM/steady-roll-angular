'use strict';

const Model = require('./Model');

class Hopital extends Model {
  constructor(doc) {
    super(Hopital.DATABASE_NAME, doc, Hopital.MODEL_SCHEMA);
    this.doc.type = Hopital.TYPE;
  }
}

Hopital.DATABASE_NAME = 'hopital';
Hopital.TYPE = 'hopital';
Hopital.MODEL_SCHEMA = {
  type: 'hopital',
  nom: '',
  adresse: '',
  tel: ''
};


module.exports = Hopital;
 