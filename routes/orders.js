'use strict';

const express = require('express');
const orders = express.Router();
const async = require('async');
const utils = require('../utils');

// Modèles
const Order = require('../models/Order');
const Article = require('../models/Article');

orders.route('/')
    /* GET all orders. */
    .get((req, res) => {
      return Order.getAll((error, orders) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return res.status(200).json(orders);
      });
    })
    /* POST order. */
    .post((req, res) => {
      const postedOrder = req.body;

      // More validations maybe?

      if (!postedOrder) {
        return res.status(400).json({
          reason: `Document d'hôpital prévu dans POST body, obtenu: ${postedOrder}`,
          statusCode: 400
        });
      }

      const newOrder = new Order(postedOrder);

      return newOrder.save((error, savedOrder) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return res.status(200).json(savedOrder.doc);
      });

    });

orders.route('/:orderId')
    /* GET order by id. */
    .get((req, res) => {
      const orderId = req.params.orderId;

      return Order.get(orderId, (error, order) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return res.status(200).json(order.doc);

      });

    })
    /* PUT order by id. */
    .put((req, res) => {
      const orderId = req.params.orderId;
      const updatedOrder = req.body;

      if (!updatedOrder) {
        return res.status(400).json({
          reason: `Document d'hôpital prévu dans PUT body, obtenu: ${updatedOrder}`,
          statusCode: 400
        });
      }

      return Order.get(orderId, (error, order) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        order.doc = _.mergeWith(order.doc, updatedOrder, utils.mergeArrays);

        return order.save((error, savedOrder) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          return res.status(200).json(savedOrder.doc);
        });

      });

    })
    /* DELETE order by id. */
    .delete((req, res) => {
      const orderId = req.params.orderId;

      return Order.get(orderId, (error, order) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return order.delete((error, response) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          return res.status(200).json(response.deleted_doc._id);
        });

      });
    });

orders.route('/:orderId/article/:articleId')
    /* POST article into order by id. */
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

orders.route('/:userId/in-progress')
    /* GET current order by userId. */
    .get((req, res) => {
      const userId = req.params.userId;

      return Order.getInProgressByUserId(userId, (error, clientOrder) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        clientOrder= Array.isArray(clientOrder) ? clientOrder[0] : null;

        if(clientOrder){
          const articleIds = clientOrder.articles.map(article => article.articleId);

          return Article.fetch(articleIds, (error, articles) => {
            if (error) {
              return res.status(error.statusCode).json(error);
            }

            clientOrder.articles = clientOrder.articles.map(article => {
              let articleDoc = articles.find(item => item._id === article.articleId);
              if (articleDoc) {
                return { ...articleDoc, ...article };
              }
              return article;
            });

            return res.status(200).json(clientOrder.articles);
          });
        }
      });
    });

module.exports = orders;

