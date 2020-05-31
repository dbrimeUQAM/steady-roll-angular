'use strict';

const Model = require('./Model');

class Hospital extends Model {
  constructor(doc) {
    super(Hospital.DATABASE_NAME, doc, Hospital.MODEL_SCHEMA);
    this.doc.type = Hospital.TYPE;
  }
}

Hospital.DATABASE_NAME = 'hospitals';
Hospital.TYPE = 'hospital';
Hospital.MODEL_SCHEMA = {
  type: Hospital.TYPE,
  name: '',
  address: '',
  phoneNumber: ''
};


module.exports = Hospital;
