'use strict';

const express = require('express');
const orders = express.Router();
const { parallel } = require('async');
const utils = require('../utils');
const _ = require('lodash');

// Modèles
const Order = require('../models/Order');
const Article = require('../models/Article');
const User = require('../models/User');
const Hospital = require('../models/Hospital');

orders.route('/')
  /* GET all orders. */
  .get((req, res) => {
    return Order.getAll((error, orders) => {
      if (error) {
        return res.status(error.statusCode).json(error);
      }

      orders = orders.filter(order => order.status !== Order.STATUS.IN_PROGRESS)

      const hospitalIds = orders.map(order => order.hospitalId);
      const uniqueHospitalIds = [ ...new Set(hospitalIds) ];

      const userIds = orders.map(order => order.userId);
      const uniqueUserIds = [ ...new Set(userIds) ];

      const tasks = {
        hospitals: (callback) => Hospital.fetch(uniqueHospitalIds, callback),
        users: (callback) => User.fetch(uniqueUserIds, callback)
      };

      return parallel(tasks, (error, results) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        const { hospitals, users } = results;

        const filteredHospitals = hospitals.filter(item => !!item);
        const filteredUsers = users.filter(item => !!item);

        const updatedOrders = orders.map(order => {
          let orderToUpdate = new Order(order);
          let user = filteredUsers.find(item => item._id === orderToUpdate.getUserId());

          if (user) {
            orderToUpdate.setDocValue('userName', user.name);
          }

          let hospital = filteredHospitals.find(item => item._id === orderToUpdate.getHospitalId());

          if (hospital) {
            orderToUpdate.setDocValue('hospitalName', hospital.name);
          }

          orderToUpdate.setDocValue('qty', orderToUpdate.getArticles().length);

          return orderToUpdate.doc;
        });

        return res.status(200).json(updatedOrders);
      });
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

      const tasks = {
        hospital: (callback) => Hospital.get(order.getHospitalId(), callback),
        user: (callback) => User.get(order.getUserId(), callback)
      };

      return parallel(tasks, (error, results) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        const { hospital, user } = results;

        order.setDocValue('hospitalName', hospital.getDocValue('name', ''));
        order.setDocValue('userName', user.getDocValue('name', ''));

        const articleIds = order.getArticles().map(article => article.articleId);
        const uniqueArticleIds = [ ...new Set(articleIds) ];

        return Article.getAllById(uniqueArticleIds, (error, articles) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          // Filter out any undefined values
          articles = articles.filter(item => !!item);

          const updatedArticles = order.getArticles().map(article => {
            let articleDoc = articles.find(item => item._id === article.articleId);
            if (articleDoc) {
              return { ...articleDoc, ...article };
            }
            return article;
          });

          order.setDocValue('articles', updatedArticles);

          return res.status(200).json(order.doc);

        });

      });

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

      // TODO - update articles if not just in progress

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
      const qty = req.body.qty;

      const tasks = [
        Article.get(articleId, callback),
        Order.get(orderId, callback)
      ];

      return parallel(tasks, (error, results) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        const { article, order } = results;

        if (article.doc.qty === 0) {
          return res.status(500).json('Quantité epuissé');
        }

        return order.addArticle(articleId, qty, (error, order) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          return res.status(200).json(order);

        });

      });

    });

orders.route('/user/:userId/in-progress')
    /* GET current order by userId. */
    .get((req, res) => {
      const userId = req.params.userId;

      return Order.getInProgressByUserId(userId, (error, clientOrder) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        const articleIds = clientOrder.getArticles().map(article => article.articleId);

        const tasks = {
          articles: (callback) => Article.getAllById(articleIds, callback),
          user: (callback) => User.get(clientOrder.getUserId(), callback),
          hospital: (callback) => Hospital.get(clientOrder.getHospitalId(), callback)
        };

        return parallel(tasks, (error, results) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          const { articles, user, hospital } = results;

          // Filter out any undefined values
          const filteredArticles = articles.filter(item => !!item);

          const updatedArticles = clientOrder.getArticles().map(article => {
            let articleDoc = filteredArticles.find(item => item._id === article.articleId);
            if (articleDoc) {
              return { ...articleDoc, ...article };
            }
            return article;
          });

          clientOrder.setDocValue('articles', updatedArticles);
          clientOrder.setDocValue('userName', user.getDocValue('name', ''));
          clientOrder.setDocValue('hospitalName', hospital.getDocValue('name', ''));

          return res.status(200).json(clientOrder.doc);

        });
      });
    });



orders.route('/user/:userId/add-article')
    /* POST article to order. */
    .post((req, res) => {
      const userId = req.params.userId;
      const { articleId, qty } = req.body;

      return Order.getInProgressByUserId(userId, (error, order) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        order.addArticle(articleId, qty);

        return order.save((error, savedOrder) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          return res.status(200).json(savedOrder.doc);
        });


      });

    });


orders.route('/user/:userId/delete-articles')
      .put((req, res) => {
        const userId = req.params.userId;

        return Order.getInProgressByUserId(userId, (error, order) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          order.deleteArticles();

          return order.save((error, savedOrder) => {
              if (error) {
                return res.status(error.statusCode).json(error);
              }

              return res.status(200).json(savedOrder.doc);
            });
        });

      });

orders.route('/user/:userId/delete-article/:articleId')
      /* delete article from order. */
      .put((req, res) => {
        const userId = req.params.userId;
        const articleId = req.params.articleId;

        return Order.getInProgressByUserId(userId, (error, order) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          order.deleteArticle(articleId);

          return order.save((error, savedOrder) => {
            if (error) {
              return res.status(error.statusCode).json(error);
            }

            return res.status(200).json(savedOrder.doc);
          });


        });

      });

  orders.route('/user/:userId/update-article/:articleId')
    .put((req, res) => {
      const userId = req.params.userId;
      const { articleId, qty } = req.body;

      return Order.getInProgressByUserId(userId, (error, order) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        order.updateArticle(articleId, qty);

        return order.save((error, savedOrder) => {
            if (error) {
              return res.status(error.statusCode).json(error);
            }

            return res.status(200).json(savedOrder.doc);
          });
      });

    });

  orders.route('/user/:userId/update-article-qty/:articleId')
    .put((req, res) => {
      const userId = req.params.userId;
      const articleId = req.params.articleId;
      const { qty } = req.body;

      const tasks = {
        order: (callback) => Order.getInProgressByUserId(userId, callback),
        article: (callback) => Article.get(articleId, callback)
      };

      return parallel(tasks, (error, results) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        const { order, article } = results;

        if (qty > article.getQty()){
          return res.status(200).json({
            error: 'Il n\'y a plus de stock disponible'
          });
        }

        order.updateArticle(articleId, qty);

        return order.save((error, savedOrder) => {
            if (error) {
              return res.status(error.statusCode).json(error);
            }

            return res.status(200).json(savedOrder.doc);
          });
      });

    });

  orders.route('/user/:userId')
    /* GET all orders by userId. */
    .get((req, res) => {
      const userId = req.params.userId;

      return Order.getAllByUserId(userId, (error, orders) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        const articleIds = orders.reduce((ids, curr) => {
          return [ ...ids, ...curr.getArticles().map(article => article.articleId) ];
        }, []);
        const uniqueArticleIds = [ ...new Set(articleIds) ];

        return Article.getAllById(uniqueArticleIds, (error, articles) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          // Filter out any undefined values
          articles = articles.filter(item => !!item);

          const updatedOrders = orders.map(order => {

            let updatedArticles = order.getArticles().map(article => {
              let articleDoc = articles.find(item => item._id === article.articleId);
              if (articleDoc) {
                return { ...articleDoc, ...article };
              }
              return article;
            });

            order.setDocValue('articles', updatedArticles);
            const date = new Date(order.getDocValue('orderDate'));
            const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
            order.setDocValue('orderDateFormatted', formattedDate);

            return order.doc;

          });

          const sortedOrders = updatedOrders.sort((a, b) => {
            const aDate = a.orderDate;
            const bDate = b.orderDate;

            if (aDate < bDate) {
              return 1;
            } else if (aDate > bDate) {
              return -1;
            }
            return 0;
          });

          return res.status(200).json(sortedOrders);

        });
      });
    });

orders.route('/:orderId/cancel')
  /* PUT cancel order by id. */
  .put((req, res) => {
    const orderId = req.params.orderId;

    return Order.get(orderId, (error, order) => {
      if (error) {
        return res.status(error.statusCode).json(error);
      }

      order.setDocValue('status', Order.STATUS.CANCELLED);
      // TODO - update articles if not just in progress

      return order.save((error, savedOrder) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return res.status(200).json(savedOrder.doc);
      });

    });

  });

module.exports = orders;

