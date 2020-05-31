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
  name: '', //nom de la personne responsable
  email: '', //login
  password: '',
  tel:'',
  idHopital: '',
  role: ''//admin ou utilisateur :hopital
};

User.ROLES = Object.freeze({
  ADMIN: 'admin',
  USER: 'user'
});

module.exports = User;
