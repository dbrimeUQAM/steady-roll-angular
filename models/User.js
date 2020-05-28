'use strict';

const Model = require('./Model');

class User extends Model {
  constructor(doc) {
    super(User.DATABASE_NAME, doc, User.MODEL_SCHEMA);
    this.doc.type = User.TYPE;
  }
}

User.DATABASE_NAME = 'users';
User.TYPE = 'user';
User.MODEL_SCHEMA = {
  type: 'user',
  name: '',
  email: '',
  password: '',
  role: ''
};

User.ROLES = Object.freeze({
  ADMIN: 'admin',
  USER: 'user'
});

module.exports = User;
