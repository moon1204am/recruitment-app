'use strict';
const Validator = require('../util/Validator');

/**
 * An competence profile in the recruitment app
 * @author Jinglan Qin
 * @param {Integer} competence_profile_id  the id of the competenceprofile
 * @param {Integer} competence_id  the id of the competence.
 * @param {number} years_of_experience  the amount years of experience.
 * @param {Integer} person_id  the id of the person
 * @param {array} competence  the array of the  Competence.
 */
class CompetenceProfileDTO {

    constructor(competence_profile_id, competence_id, years_of_experience, person_id,competence) {
      Validator.isPositiveInteger(competence_profile_id, 'competence_profile_id');
      Validator.isPositiveInteger(competence_id, 'competence_id');
      Validator.isPositiveInteger(person_id, 'person_id');
      Validator.isNumeric(years_of_experience,'years-of-experience', 0, 100);

      this.competence_profile_id = competence_profile_id;
      this.competence_id = competence_id;
      this.years_of_experience = years_of_experience ;
      this.person_id=person_id;
      this.competence=competence;
    }
}
module.exports = CompetenceProfileDTO;