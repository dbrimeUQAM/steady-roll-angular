'use strict';

const express = require('express');
const router  = express.Router();

// Models
const Article = require('../models/Article');
const Hospital = require('../models/Hospital');

router.route('/')
    /* GET liste d'articles. */
    .get((req, res) => {
      return Article.getAll((error, articles) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }
        articles.forEach();
        Hospital.get(articles.a);
        return res.status(200).json(articles);
      });
    });

module.exports = articles;
