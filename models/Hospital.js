'use strict';

const Model = require('./Model');
const utils = require('../utils');

class Hospital extends Model {
  constructor(doc) {
    super(Hospital.DATABASE_NAME, doc, Hospital.MODEL_SCHEMA);
    this.doc.type = Hospital.TYPE;
  }

  getName() {
    return this.getDocValue('name');
  }

}

Hospital.DATABASE_NAME = 'hospitals';
Hospital.TYPE = 'hospital';
Hospital.MODEL_SCHEMA = {
  type: Hospital.TYPE,
  name: '',
  street: '',
  city: '',
  province: '',
  postalCode: '',
  phone: ''
};


module.exports = Hospital;
