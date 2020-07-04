'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { parallel } = require('async');
const secret = require('../config').secret;

const auth = express.Router();

// Models
const User = require('../models/User');
const Hospital = require('../models/Hospital');
const Order = require('../models/Order');

auth.route('/signup')
    .post((req, res) => {

      return User.get(req.body.email, (error, user) => {
        if (error && error.statusCode !== 404) {
          return res.status(error.statusCode).json(error);
        }

        if (user) {
          return res.status(409).send({message: 'L\'utilisateur existe déjà!'});
        }

        const postedUser = {
          _id: req.body.email,
          type: User.TYPE,
          email: req.body.email,
          name: req.body.name,
          password: bcrypt.hashSync(req.body.password, 8),
          role: User.ROLES.USER
        };

        const newUser = new User(postedUser);

        return newUser.save((error, savedUser) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          return res.status(200).json(savedUser.doc);
        });

      });

    });

auth.route('/signin')
    .post((req, res) => {

      return User.get(req.body.email, (error, user) => {
        if (error) {
          if (error.statusCode === 404) {
            return res.status(401).send({message: 'Utilisateur et/ou mot de passe invalide!'});
          }
          return res.status(error.statusCode).json(error);
        }

        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.doc.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: 'Utilisateur et/ou mot de passe invalide!'
          });
        }

        const tasks = {
          hospital: (callback) => Hospital.get(user.getHospitalId(), callback),
          order: (callback) => Order.getInProgressByUserId(user.getId(), callback)
        };

        return parallel(tasks, (error, results) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          const { hospital, order } = results;

          const token = jwt.sign({ id: user.doc._id }, secret, {
            expiresIn: 86400 // 24 hours
          });

          return res.status(200).send({
            id: user.doc._id,
            role: user.doc.role,
            email: user.doc.email,
            name: user.doc.name,
            accessToken: token,
            hospital: hospital.doc,
            order: Array.isArray(order) ? order[0] : null
          });

        });

      });

    });

module.exports = auth;
