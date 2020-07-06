'use strict';

const express = require('express');
const middleware = require('../middleware');
const hospitals = express.Router();

// Models
const Hospital = require('../models/Hospital');
// à voir équivallent users = hospitals
hospitals.use(middleware.isAuthenticated);

hospitals.route('/')
    /* GET liste des hopitaux. */
    .get((req, res) => {
        return Hospital.getAll((error, hospitals) => {
            if (error) {
                return res.status(error.statusCode).json(error);
            }

            return res.status(200).json(hospitals);
        });
    })
    .post((req, res) => {
        const postedHospital = req.body;

        if (!postedHospital) {
            return res.status(400).json({
                reason: `Document d'utilisateur prévu dans POST body, obtenu: ${postedHospital}`,
                statusCode: 400
            });
        }

        const newHospital = new Hospital(postedHospital);

        return newHospital.save((error, savedHospital) => {
            if (error) {
                return res.status(error.statusCode).json(error);
            }

            return res.status(200).json(savedHospital.doc);
        });

    });

hospitals.route('/:userId')
    .get((req, res) => {
        const userId = req.params.userId;

        return User.get(userId, (error, user) => {
            if (error) {
                return res.status(error.statusCode).json(error);
            }

            return res.status(200).json(user.doc);

        });

    })
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

            return user.save((error, savedHospital) => {
                if (error) {
                    return res.status(error.statusCode).json(error);
                }

                return res.status(200).json(savedHospital.doc);
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

module.exports = hospitals;
