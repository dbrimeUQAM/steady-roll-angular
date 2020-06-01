'use strict';

const Model = require('./Model');

class Order extends Model {
  constructor(doc) {
    super(Order.DATABASE_NAME, doc, Order.MODEL_SCHEMA);
    this.doc.type = Order.TYPE;
  }

  /**
   * Ajoute un article à la commande
   * @param {string} - articleId
   * @returns {Order}
   */
  static addArticle(articleId, callback) {
    //exemple de methode de classe
  }



}
/*
*une entr/e dans la table articles
{
  // articleId: '',
  // qty: '',
  // price: ''
}
*/
Order.DATABASE_NAME = 'orders';
Order.TYPE = 'order';
Order.MODEL_SCHEMA = {
  type: Order.TYPE,
  hospitalId: '',
  userId: '',
  orderDate: '',
  status: '', // encours, facturer,
  articles: []
};

Order.STATUS = Object.freeze({
  IN_PROGRESS: 'En cours',
  PAID: 'Payée',
  IN_PREPARATION: 'En préparation',
  SHIPPED: 'Expediée',
  DELIVERED: 'Livrée'
});

module.exports = Order;
