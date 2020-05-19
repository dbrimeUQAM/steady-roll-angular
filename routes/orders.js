'use strict';

const express = require('express');
const router = express.Router();

// Modèles
const Order = require('../models/Order');

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

module.exports = router;
