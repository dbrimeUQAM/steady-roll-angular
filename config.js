'use strict';

require('dotenv').config();

// Libraire Cloudant pour accès à la base des données.
const cloudant = require('@cloudant/cloudant');

// Initialise Cloudant avec les réglages dans .env.
const username = process.env.cloudant_username;
const password = process.env.cloudant_password;

const secret = process.env.secret;

function onCloudantReady(error) {
  if (error) {
    return console.error(`Cloudant n'a pas réussi à se connecter ${error}`);
  }

  console.log('Connexion Cloudant réussie');
}

module.exports = {
  cloudant: cloudant({account: username, password: password}, onCloudantReady),
  secret
};
