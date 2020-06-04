'use strict';

const express = require('express');
const middleware = require('../middleware');
const articles = express.Router();

// Models
const User = require('../models/Article');

users.use(middleware.isAuthenticated);

users.route('/getAllArticles')
    /* GET liste d'articles. */
    .get((req, res) => {
      return Article.getAll((error, articles) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return res.status(200).json(articles);
      });
    });

module.exports = articles;
