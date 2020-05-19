'use strict';

const cloudant = require('../config').cloudant;
const merge = require('lodash/merge');

/**
 * Classe de base pour tous les modèles de données.
 */
class Model {
  constructor(database, doc, schema) {
    if (!database || typeof database !== 'string') {
      throw new Error('Modèle configuré incorrectement, nom de base de données manquant.');
    }

    if (!schema) {
      schema = {};
    }

    this.db = cloudant.db.use(database);

    // Fusionner le schéma avec le doc.
    this.doc = merge({}, schema, doc);
  }

  /**
   * Obtenez toutes les instances de la classe.
   *
   * @static
   * @param {string} [view] Vue nommée attachée au document de conception de modèle dans la base de données pour ce modèle.
   * @param {function} callback Appelé avec la réponse de Cloudant.
   * @memberof Model
   */
  static getAll(view, callback) {
    if (typeof view === 'function') {
      callback = view;
      view = 'all';
    }

    this.view('model', view, {include_docs: true}, (error, data) => {
      if (error) {
        return callback(error);
      }

      const filtered = data.rows.map((row) => row.doc);

      return callback(null, filtered);
    });
  }

  /**
   * Demande une vue des modèles.
   *
   * @static
   * @param {string} designDoc Le document de conception contenant la vue.
   * @param {string} viewName Le nom de la vue.
   * @param {object} options Toutes les options supplémentaires à passer à la demande.
   * @param {function} callback
   * @memberof Model
   */
  static view(designDoc, viewName, options, callback) {
    const db = this.dbInstance();
    db.view(designDoc, viewName, options, (error, data) => {
      if (error) {
        return callback(error);
      }

      return callback(null, data);
    });
  }

  /**
   * Obtiens une instance de la classe avec le doc
   * attaché
   *
   * Lance une erreur si aucun document n'a été trouvé pour l'id transmis.
   *
   * @static
   * @param {string} id Identifiant de document cloudant.
   * @param {function} callback Appelé avec la réponse de Cloudant.
   * @memberof Model
   */
  static get(id, callback) {

    var db = this.dbInstance();
    var type = this.TYPE;

    db.get(id, (error, data) => {
      var model;

      if (error) {
        return callback(error);
      }

      if (type !== data.type) {
        return callback(new Error(`Doc ${id} type ${data.type}, ne correspond pas au type de modèle ${type}`));
      }

      model = new this(data);
      return callback(null, model);
    });

  }

  /**
   * Enregistre l'état actuel du document de ce modèle dans Cloudant.
   *
   * @param {function} callback Appelé avec la réponse de Cloudant.
   * @memberof Model
   */
  save(callback) {
    Model.updateTimeStamps(this.doc);

    this.db.insert(this.doc, (error, data) => {
      if (error) {
        return callback(error);
      }

      // Définit _id sur doc si cet insert crée un nouveau document.
      if (!this.doc.hasOwnProperty('_id')) {
        this.doc._id = data.id;
      }

      // Met à jour le _rev sur ce document après chaque sauvegarde.
      this.doc._rev = data.rev;

      return callback(null, this);
    });
  }

  delete(callback) {
    this.db.destroy(this.doc._id, this.doc._rev, (error, data) => {
      if (error) {
        return callback(error);
      }

      return callback(null, { deleted_doc: this.doc, data: data });
    });
  }

  /**
   * Retourne une instance de la base de données Cloudant
   *
   * @static
   * @returns {object} Instance de la base de données Cloudant
   * @memberof Model
   */
  static dbInstance() {
    return cloudant.db.use(this.DATABASE_NAME);
  }

  /**
   * Met à jour les horodatages des documents «créé» et «mis à jour»
   * Modifie le document fourni.
   * @param {Object} doc Document Cloudant dont les horodatages doivent être mis à jour.
   */
  static updateTimeStamps(doc) {
    var date = new Date();

    if (doc._rev) {
      doc.timeStampUpdated = date;
    } else {
      doc.timeStampCreated = date;
    }
  }

}

module.exports = Model;
