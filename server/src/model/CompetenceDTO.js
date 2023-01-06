'use strict';
const Validator = require('../util/Validator');

/**
 * An competence in the recruitment app
 * @author Jinglan Qin
 * @param {integer} competence_id  the id of the competence
 *@param {string} name  the first name of the competence
 */
    

class CompetenceDTO {

    constructor(competence_id, name) {
       Validator.isPositiveInteger(competence_id, 'competence_id');
       Validator.isString(name, 'name');
       
       this.competence_id = competence_id;
       this.name = name;
    }
}
module.exports = CompetenceDTO;