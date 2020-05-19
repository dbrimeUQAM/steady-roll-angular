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
   * Retourne une instance de la base de données Cloudant
   *
   * @static
   * @returns {object} Instance de la base de données Cloudant
   * @memberof Model
   */
  static dbInstance() {
    return cloudant.db.use(this.DATABASE_NAME);
  }
}

module.exports = Model;
