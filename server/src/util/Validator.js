'use strict'

const assert = require('assert').strict;
const validator = require('validator');

/**
 * A class of validators.
 */
class Validator{

    /**
     * Asserts if specified value is a string.
     * @param {any} value 
     * @param {String} varName 
     * 
     * @throws {AssertionError} if validation fails
     */
    static isString(value, varName){
        assert.equal(typeof value, 'string', `${varName} must be a string.`);
    }

    static isInteger(value, varName){
        assert.equal(typeof value, 'number', `${varName} must be a Number.`);
        assert(!Number.isNaN(value) && Number.isInteger(value), `${varName} must be an integer.`);
    }

    /**
     * Asserts if specified value is a positive integer.
     * @param {any} value 
     * @param {string} varName 
     * 
     * @throws {AssertionError} if validation fails
     */
    static isPositiveInteger(value, varName){
        Validator.isInteger(value,varName)
        assert(value > 0, `${varName} must be a positive integer.`);
    }

    /**
     * Asserts if specified object is instance of specified class
     * @param {any} value the object to check
     * @param {any} requiredClass the class to check if the object is an instance of
     * @param {string} varName the name of the variable
     * @param {string} className the name of the required class
     */
    static isInstanceOf(value, requiredClass, varName, className){
        assert(value instanceof requiredClass, `${varName} must be an instance of ${className}`);
    }

    static isIntegerBetween(value, lowerLimit, upperLimit, varName) {
        Validator.isInteger(value, varName);
        assert(
            value >= lowerLimit && value <= upperLimit,
            `${varName} must be an integer between ${lowerLimit} and ${upperLimit}.`
        );
      }

      static isStringRepresentingDate(value, varName) {
        Validator.isString(value, varName);
        assert(
            validator.isISO8601(value, {strict: true}),
            `${varName} must be a valid date.`
        );
    }
    
    static isNumeric(value, varName, lowerLimit, upperLimit ){

        assert(
          //  Number.isNaN(value, varName),
            !!(value % 1) && value >=lowerLimit && value<upperLimit,
            `${varName} must be an decimal or an integer between ${lowerLimit} and ${upperLimit}.`
          )
      }
}
module.exports = Validator;