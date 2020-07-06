'use strict';

const express = require('express');
const middleware = require('../middleware');
const invoices = express.Router();
const utils = require('../utils');

// Models
const Invoice = require('../models/Invoice');

invoices.use(middleware.isAuthenticated);

invoices.route('/')
    /* GET all invoices. */
    .get((req, res) => {
      return Invoice.getAll((error, invoices) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return res.status(200).json(invoices);
      });
    })
    /* POST invoice. */
    .post((req, res) => {
      const postedInvoice = req.body;

      // More validations maybe?

      if (!postedInvoice) {
        return res.status(400).json({
          reason: `Document d'hôpital prévu dans POST body, obtenu: ${postedInvoice}`,
          statusCode: 400
        });
      }

      const newInvoice = new Invoice(postedInvoice);

      return newInvoice.save((error, savedInvoice) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return res.status(200).json(savedInvoice.doc);
      });

    });

  invoices.route('/:invoiceId')
    /* GET invoice by id. */
    .get((req, res) => {
      const invoiceId = req.params.invoiceId;

      return Invoice.get(invoiceId, (error, invoice) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return res.status(200).json(invoice.doc);

      });

    })
    /* PUT invoice by id. */
    .put((req, res) => {
      const invoiceId = req.params.invoiceId;
      const updatedInvoice = req.body;

      if (!updatedInvoice) {
        return res.status(400).json({
          reason: `Document d'hôpital prévu dans PUT body, obtenu: ${updatedInvoice}`,
          statusCode: 400
        });
      }

      return Invoice.get(invoiceId, (error, invoice) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        invoice.doc = _.mergeWith(invoice.doc, updatedInvoice, utils.mergeArrays);

        return invoice.save((error, savedInvoice) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          return res.status(200).json(savedInvoice.doc);
        });

      });

    })
    /* DELETE invoice by id. */
    .delete((req, res) => {
      const invoiceId = req.params.invoiceId;

      return Invoice.get(invoiceId, (error, invoice) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return invoice.delete((error, response) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          return res.status(200).json(response.deleted_doc._id);
        });

      });
    });

module.exports = invoices;
