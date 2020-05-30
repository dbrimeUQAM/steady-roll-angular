'use strict';

const Model = require('./Model');

class Article extends Model {
  constructor(doc) {
    super(Article.DATABASE_NAME, doc, Article.MODEL_SCHEMA);
    this.doc.type = Article.TYPE;
  }
}

Article.DATABASE_NAME = 'article';
Article.TYPE = 'article';
Article.MODEL_SCHEMA = {
  type: 'article',
  //la catégorie peut etre médicament, fourniture, équipement
  categorie: '',
  nom: '',
  descriptif: '',
  dateExpiration: '',
  provenance: '',
  etat: '',
  echange: '', // à vendre ou à donner
  quantite: '',
  prix: ''
};

// Hopital.ROLES = Object.freeze({
//   ADMIN: 'admin',
//   USER: 'user'
// });

module.exports = Article;
 
