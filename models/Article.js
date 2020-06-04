'use strict';

const Model = require('./Model');

class Article extends Model {
  constructor(doc) {
    super(Article.DATABASE_NAME, doc, Article.MODEL_SCHEMA);
    this.doc.type = Article.TYPE;
  }
}

Article.DATABASE_NAME = 'articles';
Article.TYPE = 'article';
Article.MODEL_SCHEMA = {
  type: Article.TYPE,
  //la catégorie peut être médicament, fourniture, équipement
  articleType: '',
  name: '',
  description: '',
  expirationDate: '',
  hospitalName: '',
  condition: '',
  offerType: '', // à vendre ou à donner
  quantity: null,
  price: null
};

Article.ARTICLE_TYPES = Object.freeze({
  PRESCRIPTION_DRUG: 'médicament',
  SUPPLY: 'fourniture',
  EQUIPMENT: 'équipement'
});

Article.OFFER_TYPES = Object.freeze({
  FOR_SALE: 'à vendre',
  TO_GIFT: 'à donner'
});

Article.CONDITIONS = Object.freeze({
  NEW: 'nouveau',
  VERY_GOOD: 'très bon état',
  GOOD: 'bon',
  FAIR: 'acceptable',
  POOR: 'mauvais'
});

module.exports = Article;

