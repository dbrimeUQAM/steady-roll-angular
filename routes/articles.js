'use strict';

const express = require('express');
//const middleware = require('../middleware');
const articles = express.Router();

// Models
const Article = require('../models/Article');
const Hospital = require('../models/Hospital');

//articles.use(middleware.isAuthenticated);

articles.route('/')
    /* GET liste d'articles. */
    .get((req, res) => {
      return Article.getAll((error, articles) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        const hospitalIds = articles.map(article => article.hospitalId);
        const uniqueHospitalIds = [ ...new Set(hospitalIds) ];

        return Hospital.fetch(uniqueHospitalIds, (error, hospitals) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          articles = articles.map(article => {
            let hospital = hospitals.find(hospital => hospital._id === article.hospitalId);

            article.hospitalName = hospital.name;

            return article;

          })

          return res.status(200).json(articles);

        });


      });
    });

module.exports = articles;
