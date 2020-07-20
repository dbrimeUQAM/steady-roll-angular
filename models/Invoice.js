'use strict';

const Model = require('./Model');

class Invoice extends Model {
  constructor(doc) {
    super(Invoice.DATABASE_NAME, doc, Invoice.MODEL_SCHEMA);
    this.doc.type = Invoice.TYPE;
  }

}

Invoice.DATABASE_NAME = 'invoices';
Invoice.TYPE = 'invoice';

Invoice.STATUS = Object.freeze({
  PAYMENT_DUE: 'En attente de paiement',
  PAID: 'Payée'
});

Invoice.PAYMENT_TYPES = Object.freeze({
  WIRE_TRANSFER: 'Virement Bancaire',
  CHECK: 'Chéque',
  CASH: 'Comptant',
  CC: 'Carte de crédit'
});

Invoice.MODEL_SCHEMA = {
  type: Invoice.TYPE,
  userId: '',
  orderId: '',
  invoiceDate: '',
  status: Invoice.STATUS.PAYMENT_DUE,
  paymentType: Invoice.PAYMENT_TYPES.CC
};



module.exports = Invoice;
