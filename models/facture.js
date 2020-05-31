'use strict';

const Model = require('./Model');

class Facture extends Model {
  constructor(doc) {
    super(Commande.DATABASE_NAME, doc, Commande.MODEL_SCHEMA);
    this.doc.type = Commande.TYPE;
  }
}
/*
*une entr/e dans la table contenu
{
  // article: '',
  // quantite: '',
  // prix: ''
}
*/
Commande.DATABASE_NAME = 'commandes';
Commande.TYPE = 'commande';
Commande.MODEL_SCHEMA = {
  type: 'commande',
  idHopital: '',
  idUser: '',
  date: '',
  etat: '', // encours, facturer, 
  contenu:[] 
};

Commande.ETATS = Object.freeze({
  ENCOURS: 'En cours',
  PAYEE: 'Payée',
  EN_PREPARATION: 'En préparation'
});

module.exports = Commande;