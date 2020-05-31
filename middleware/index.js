'use strict';

const jwt = require("jsonwebtoken");
const secret = require('../config').secret;

// Models
const User = require('../models/User');

function isAdmin(req, res, next)  {

  return User.get(res.userId, (error, user) => {

    if (error) {
      return res.status(error.statusCode).send(error);
    }

    if (user.role !== User.ROLES.ADMIN) {
      return res.status(401).send({
        message: 'Non autorisé!'
      });
    }

    next();

  });

}

function isAuthenticated(req, res, next)  {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: 'Aucun jeton fourni!'
    });
  }

  const tokenParts = token.split(' ');

  if (tokenParts.length !== 2) {
    return res.status(403).send({
      message: 'Jeton invalide!'
    });
  }

  jwt.verify(tokenParts[1], secret, (error, decoded) => {
    if (error) {
      return res.status(401).send({
        message: 'Non autorisé!'
      });
    }

    res.userId = decoded.id;
    next();

  });

}

function isValidEmail(req, res, next)  {
  return next();
}

module.exports = {
  isAdmin,
  isAuthenticated,
  isValidEmail
}
