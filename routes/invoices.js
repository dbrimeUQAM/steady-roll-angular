'use strict';

const express = require('express');
const middleware = require('../middleware');
const invoices = express.Router();
const utils = require('../utils');
const { parallel } = require('async');

// Models
const Invoice = require('../models/Invoice');
const Order = require('../models/Order');
const User = require('../models/User');
const Hospital = require('../models/Hospital');

invoices.use(middleware.isAuthenticated);

invoices.route('/')
    /* GET all invoices. */
    .get((req, res) => {
      return Invoice.getAll((error, invoices) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        const hospitalIds = invoices.map(invoice => invoice.hospitalId);
        const uniqueHospitalIds = [ ...new Set(hospitalIds) ];

        const userIds = invoices.map(invoice => invoice.userId);
        const uniqueUserIds = [ ...new Set(userIds) ];

        const orderIds = invoices.map(invoice => invoice.orderId);
        const uniqueOrderIds = [ ...new Set(orderIds) ];

        const tasks = {
          hospitals: (callback) => Hospital.fetch(uniqueHospitalIds, callback),
          users: (callback) => User.fetch(uniqueUserIds, callback),
          orders: (callback) => Order.fetch(uniqueOrderIds, callback)
        };

        return parallel(tasks, (error, results) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          const { hospitals, users, orders } = results;

          const filteredHospitals = hospitals.filter(item => !!item);
          const filteredUsers = users.filter(item => !!item);
          const filteredOrders = orders.filter(item => !!item);

          const updatedInvoices = invoices.map(invoice => {
            let invoiceToUpdate = new Invoice(invoice);
            let user = filteredUsers.find(item => item._id === invoiceToUpdate.getUserId());

            if (user) {
              invoiceToUpdate.setDocValue('userName', user.name);
            }

            let hospital = filteredHospitals.find(item => item._id === invoiceToUpdate.getHospitalId());

            if (hospital) {
              invoiceToUpdate.setDocValue('hospitalName', hospital.name);
            }

            let order = filteredOrders.find(item => item._id === invoiceToUpdate.getOrderId());

            if (order) {
              invoiceToUpdate.setDocValue('articles', order.articles);
            }

            return invoiceToUpdate.doc;
          });

          return res.status(200).json(updatedInvoices);
        });
      });
    })
    /* POST invoice. */
    .post((req, res) => {
      const postedInvoice = req.body;


      if (!postedInvoice) {
        return res.status(400).json({
          reason: `Document de facture prévu dans POST body, obtenu: ${postedInvoice}`,
          statusCode: 400
        });
      }

      return Order.get(postedInvoice.orderId, (error, order) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return order.confirm((error, savedOrder) => {
          if (error) {
            return res.status(error.statusCode).json(error);
          }

          const newInvoice = new Invoice(postedInvoice);

          return newInvoice.save((error, savedInvoice) => {
            if (error) {
              return res.status(error.statusCode).json(error);
            }

            return res.status(200).json(savedInvoice.doc);
          });

        });

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

  invoices.route('/:invoiceId/paid')
  /* PUT cancel order by id. */
  .put((req, res) => {
    const invoiceId = req.params.invoiceId;

    return Invoice.get(invoiceId, (error, invoice) => {
      if (error) {
        return res.status(error.statusCode).json(error);
      }

      invoice.setDocValue('status', Invoice.STATUS.PAID);

      return invoice.save((error, savedInvoice) => {
        if (error) {
          return res.status(error.statusCode).json(error);
        }

        return res.status(200).json(savedInvoice.doc);
      });

    });

  });

module.exports = invoices;
