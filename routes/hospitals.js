'use strict';

const _ = require('lodash');
const express = require('express');
const middleware = require('../middleware');
const hospitals = express.Router();
const utils = require('../utils');

// Models
const Hospital = require('../models/Hospital');

hospitals.route('/')
    /* GET all hospitals. */
    .get((req, res) => {
      return Hospital.getAll((error, hospitals) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return res.status(200).json(hospitals);
      });
    })
    /* POST hospital. */
    .post(middleware.isAuthenticated, (req, res) => {
      const postedHospital = req.body;

      // More validations maybe?

      if (!postedHospital) {
        return res.status(400).json({
          reason: `Document d'hôpital prévu dans POST body, obtenu: ${postedHospital}`,
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

  hospitals.route('/:hospitalId')
    /* GET hospital by id. */
    .get(middleware.isAuthenticated, (req, res) => {
      const hospitalId = req.params.hospitalId;

      return Hospital.get(hospitalId, (error, hospital) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return res.status(200).json(hospital.doc);

      });

    })
    /* PUT hospital by id. */
    .put(middleware.isAuthenticated, (req, res) => {
      const hospitalId = req.params.hospitalId;
      const updatedHospital = req.body;

      if (!updatedHospital) {
        return res.status(400).json({
          reason: `Document d'hôpital prévu dans PUT body, obtenu: ${updatedHospital}`,
          statusCode: 400
        });
      }

      return Hospital.get(hospitalId, (error, hospital) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        hospital.doc = _.mergeWith(hospital.doc, updatedHospital, utils.mergeArrays);

        return hospital.save((error, savedHospital) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          return res.status(200).json(savedHospital.doc);
        });

      });

    })
    /* DELETE hospital by id. */
    .delete(middleware.isAuthenticated, (req, res) => {
      const hospitalId = req.params.hospitalId;

      return Hospital.get(hospitalId, (error, hospital) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return hospital.delete((error, response) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          return res.status(200).json(response.deleted_doc._id);
        });

      });
    });

module.exports = hospitals;
