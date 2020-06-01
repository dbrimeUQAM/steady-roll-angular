'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');

// Modèles
const Order = require('../models/Order');
const Article = require('../models/Article');

/* GET liste de commandes. */
router.route('/')
    .get((req, res) => {
      return Order.getAll((error, orders) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return res.status(200).json(orders);
      });
    });

router.route('/:orderId/article/:articleId')
    .post((req, res) => {

      const orderId = req.params.orderId;
      const articleId = req.params.articleId;
      const quantity = req.body.quantity;

      const tasks = [
        Article.get(articleId, callback),
        Order.get(orderId, callback)
      ];

      return async.parallel(tasks, (error, results) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        const { article, order } = results;

        if (article.doc.quantity === 0) {
          return res.status(500).json('Quantité epuissé');
        }

        return order.addArticle(articleId, quantity, (error, order) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          return res.status(200).json(order);

        });

      });

    });

module.exports = router;
