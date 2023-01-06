'use strict'
const Validator = require('../util/Validator');


/**
 * An user on the recruitment application.
 * @author Marta Hansbo
 */
class UserDTO {


    /**
     * Creates a new instance of user
     * @param {number} person_id  the id of the user
     * @param {string} name  the first name of the user
     * @param {string} surname  the surname of the user
     * @param {string} pnr  the person number of the user
     * @param {string} email  the email of the user
     * @param {number} role_id  the role id of the user
     * @param {string} username (might be implemented for now zero or null)
     */
    constructor(person_id, name, surname, role_id, username){
    Validator.isPositiveInteger(person_id, 'person_id');
    Validator.isString(name, 'name');
    Validator.isString(surname, 'surname');
    Validator.isPositiveInteger(role_id, 'role_id');

    this.person_id = person_id;
    this.name = name;
    this.surname = surname;
    this.role_id = role_id;
    this.username = username;

    }
}

module.exports = UserDTO;