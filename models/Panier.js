'use strict';

const Model = require('./Model');

class Panier extends Model {
  constructor(doc) {
    super(Panier.DATABASE_NAME, doc, Panier.MODEL_SCHEMA);
    this.doc.type = Panier.TYPE;
  }
}

Panier.DATABASE_NAME = 'panier';
Panier.TYPE = 'panier';
Panier.MODEL_SCHEMA = {
  type: 'panier',
  codeHopital: '',
  date: '',
  etat: '', // encours, valider ou facturé 
  contenu: {
    article: '',
    quantite: '',
    prix: ''
  }
};

// Hopital.ROLES = Object.freeze({
//   ADMIN: 'admin',
//   USER: 'user'
// });

module.exports = Panier;
 
