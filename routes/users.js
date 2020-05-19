'use strict';

const express = require('express');
const router = express.Router();

// Modèles
const User = require('../models/User');

router.route('/')
    /* GET liste d'utilisateurs. */
    .get((req, res) => {
      return User.getAll((error, users) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return res.status(200).json(users);
      });
    })
    .post((req, res) => {
      const postedUser = req.body;

      if (!postedUser) {
        return res.status(400).json({
          reason: `Document d'utilisateur prévu dans POST body, obtenu: ${postedUser}`,
          statusCode: 400
        });
      }

      const newUser = new User(postedUser);

      return newUser.save((error, savedUser) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return res.status(200).json(savedUser.doc);
      });

    });

router.route('/:userId')
    .put((req, res) => {
      const userId = req.params.userId;
      const updatedUser = req.body;

      if (!updatedUser) {
        return res.status(400).json({
          reason: `Document d'utilisateur prévu dans PUT body, obtenu: ${updatedUser}`,
          statusCode: 400
        });
      }

      return User.get(userId, (error, user) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        user.doc = updatedUser;

        return user.save((error, savedUser) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          return res.status(200).json(savedUser.doc);
        });

      });

    })
    .delete((req, res) => {
      const userId = req.params.userId;

      return User.get(userId, (error, user) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return user.delete((error, response) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          return res.status(200).json(response.deleted_doc._id);
        });

      });
    });

module.exports = router;
