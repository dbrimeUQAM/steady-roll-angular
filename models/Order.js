'use strict';

const Model = require('./Model');

class Order extends Model {
  constructor(doc) {
    super(Order.DATABASE_NAME, doc, Order.MODEL_SCHEMA);
    this.doc.type = Order.TYPE;
  }
}

Order.DATABASE_NAME = 'orders';
Order.TYPE = 'order';
Order.MODEL_SCHEMA = {
  type: 'order'
};

module.exports = Order;
