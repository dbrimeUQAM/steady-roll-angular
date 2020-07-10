'use strict';

const Model = require('./Model');
const User = require('./User');

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
  addArticle(articleId, qty, callback) {
    const articles = this.getArticles();
    const foundIndex = articles.findIndex(article => article.articleId === articleId);
    if (foundIndex !== -1) {
      articles[foundIndex].qty += qty;
    } else {
      articles.push({
        articleId,
        qty
      });
    }

    return this;

  }

  getArticles() {
    return this.getDocValue('articles', []);
  }

  static getInProgressByUserId(userId, callback) {

    const options = {
      key: userId,
      include_docs: true
    }

    return Order.view('model', 'by-user-in-progress', options, (error, data) => {
      if (error) {
        return callback(error);
      }

      const filtered = data.rows.map(row => row.doc);

      if (filtered.length > 0) {
        return callback(null, new Order(filtered[0]));
      } else {

        return User.get(userId, (error, user) => {
          if (error) {
            return callback(error);
          }

          const newOrder = new Order({
            userId,
            type: Order.TYPE,
            status: Order.STATUS.IN_PROGRESS,
            hospitalId: user.getHospitalId(),
            orderDate: new Date()
          });

          return newOrder.save(callback);

        });

      }

    });
  }



}
/*
*une entr/e dans la table articles
{
  // articleId: '',
  // qty: '',

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
