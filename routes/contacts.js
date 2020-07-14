'use strict';

const express = require('express');
const middleware = require('../middleware');
const contacts = express.Router();
const utils = require('../utils');

// Models
const Contact = require('../models/Contact');
const Hospital = require('../models/Hospital');

contacts.use(middleware.isAuthenticated);

contacts.route('/')
    /* GET all contacts. */
    .get((req, res) => {
      return Contact.getAll((error, contacts) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        const hospitalIds = contacts.map(contact => contact.hospitalId).filter(item => !!item);
        const uniqueHospitalIds = [ ...new Set(hospitalIds) ];

        return Hospital.fetch(uniqueHospitalIds, (error, hospitals) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          // Filter out any undefined values
          hospitals = hospitals.filter(item => !!item);

          contacts = contacts.map(contact => {
            let hospital = hospitals.find(hospital => hospital._id === contact.hospitalId);

            if (hospital) {
              contact.hospitalName = hospital.name;
            }

            return contact;

          })

          return res.status(200).json(contacts);

        });
      });
    })
    /* POST contact. */
    .post((req, res) => {
      const postedContact = req.body;

      // More validations maybe?

      if (!postedContact) {
        return res.status(400).json({
          reason: `Document de contact prévu dans POST body, obtenu: ${postedContact}`,
          statusCode: 400
        });
      }

      const newContact = new Contact(postedContact);

      return newContact.save((error, savedContact) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return res.status(200).json(savedContact.doc);
      });

    });

  contacts.route('/:contactId')
    /* GET contact by id. */
    .get((req, res) => {
      const contactId = req.params.contactId;

      return Contact.get(contactId, (error, contact) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        const hospitalId = contact.getHospitalId() || '-1';

        return Hospital.get(hospitalId, (error, hospital) => {
          if (error && error.statusCode !== 404) {
            return res.status(error.statusCode).json(error);
          }

          if (hospital) {
            contact.setDocValue('hospitalName', hospital.getDocValue('name'));
          }

          return res.status(200).json(contact.doc);

        });

      });

    })
    /* PUT contact by id. */
    .put((req, res) => {
      const contactId = req.params.contactId;
      const updatedContact = req.body;

      if (!updatedContact) {
        return res.status(400).json({
          reason: `Document d'hôpital prévu dans PUT body, obtenu: ${updatedContact}`,
          statusCode: 400
        });
      }

      return Contact.get(contactId, (error, contact) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        contact.doc = _.mergeWith(contact.doc, updatedContact, utils.mergeArrays);

        return contact.save((error, savedContact) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          return res.status(200).json(savedContact.doc);
        });

      });

    })
    /* DELETE contact by id. */
    .delete((req, res) => {
      const contactId = req.params.contactId;

      return Contact.get(contactId, (error, contact) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return contact.delete((error, response) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          return res.status(200).json(response.deleted_doc._id);
        });

      });
    });

contacts.route('/:contactId/mark-as-read')
    /* PUT contact by id. */
    .put((req, res) => {
      const contactId = req.params.contactId;

      return Contact.get(contactId, (error, contact) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        contact.markAsRead();

        return contact.save((error, savedContact) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          return res.status(200).json(savedContact.doc);
        });

      });

    })

module.exports = contacts;
