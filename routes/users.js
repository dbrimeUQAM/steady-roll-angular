'use strict';

const express = require('express');
const router = express.Router();

// Modèles
const User = require('../models/User');

/* GET liste d'utilisateurs. */
router.route('/')
    .get((req, res) => {
      return User.getAll((error, users) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return res.status(200).json(users);
      });
    });

module.exports = router;
