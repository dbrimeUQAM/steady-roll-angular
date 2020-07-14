'use strict';

const Model = require('./Model');

class Contact extends Model {
  constructor(doc) {
    super(Contact.DATABASE_NAME, doc, Contact.MODEL_SCHEMA);
    this.doc.type = Contact.TYPE;
    this.doc.status = Contact.STATUS.NEW;
  }

  markAsRead() {
    this.setDocValue('read', true);
  }

}

Contact.DATABASE_NAME = 'contacts';
Contact.TYPE = 'contact';
Contact.MODEL_SCHEMA = {
  type: Contact.TYPE,
  name: '',
  email: '',
  phone: '',
  message: '',
  status: ''
};

Contact.STATUS = Object.freeze({
  NEW: 'Nouveau',
  READ: 'Lu',
  CONTACTED: 'Contacté',
  CLOSED: 'Fermé'
});

module.exports = Contact;
