'use strict';

const Model = require('./Model');

class User extends Model {
  constructor(doc) {
    super(User.DATABASE_NAME, doc, User.MODEL_SCHEMA);
    this.doc.type = User.TYPE;
  }

  setActive() {
    this.setDocValue('active', true);
  }

}

User.DATABASE_NAME = 'users';
User.TYPE = 'user';
User.MODEL_SCHEMA = {
  type: User.TYPE,
  name: '', //nom de la personne responsable
  email: '', //login
  password: '',
  phoneNumber:'',
  hospitalId: '',
  role: '',
  active: false
};

User.ROLES = Object.freeze({
  ADMIN: 'admin',
  USER: 'user'
});

module.exports = User;
