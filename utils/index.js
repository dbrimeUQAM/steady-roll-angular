'use strict';

const _ = require('lodash');

function applyChange(parentObject, pathToProperty, newValue, changeHistoryProperty) {
  var priorValue;
  var pathParts = pathToProperty.split('.');
  var lastProperty = pathParts.pop();

  var lastObject = pathParts
    .reduce((prev, curr) => {
      if (prev && prev.hasOwnProperty(curr)) {
        return prev[curr];
      }
      return undefined;
    }, parentObject);

  if (lastObject === undefined) {
    return false;
  }

  priorValue = lastObject[lastProperty];

  if (priorValue === newValue) {
    return false;
  }

  lastObject[lastProperty] = newValue;

  if (priorValue !== undefined && changeHistoryProperty) {
    if (!parentObject.hasOwnProperty(changeHistoryProperty)) {
      parentObject[changeHistoryProperty] = [];
    }

    parentObject[changeHistoryProperty].unshift({
      field: pathToProperty,
      priorValue: priorValue,
      changeDate: moment().toISOString()
    });
  }
  return true;
}

function getPathValue(obj, path, defaultValue) {
  var lastObject;
  var lastProperty;
  var pathParts;

  if (obj === undefined || path === undefined) {
    return defaultValue;
  }

  pathParts = path.split('.');
  lastProperty = pathParts.pop();
  lastObject = pathParts.reduce((prev, curr) => {
    if (prev && prev.hasOwnProperty(curr)) {
      return prev[curr];
    }
    return undefined;
  }, obj);

  return (lastObject && lastObject.hasOwnProperty(lastProperty) ? lastObject[lastProperty] : defaultValue);

}

function mergeArrays(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return _.union(objValue, srcValue);
  }
}

module.exports = {
  applyChange,
  getPathValue,
  mergeArrays
};
