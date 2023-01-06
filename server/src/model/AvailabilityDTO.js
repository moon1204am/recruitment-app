'use strict';
const Validator = require('../util/Validator');

/**
 * An DTO containing information about availability in the recruitment app.
 * @author Maya
 */
class AvailabilityDTO {
    
    /**
     * Constructor, creates a new instance of the DTO.
     * @param {*} availability_id The id of the availability.
     * @param {*} person_id The id of the person the availability belongs to.
     * @param {*} from_date The start date of the availiability.
     * @param {*} to_date The end date of the availiability.
     */
    constructor(availability_id, person_id, from_date, to_date) {
        Validator.isPositiveInteger(availability_id, 'availability_id');
        Validator.isPositiveInteger(person_id, 'person_id');
        Validator.isStringRepresentingDate(from_date, 'from_date');
        Validator.isStringRepresentingDate(to_date, 'to_date');

        this.availability_id = availability_id;
        this.person_id = person_id;
        this.from_date = from_date;
        this.to_date = to_date;
    }
}

module.exports = AvailabilityDTO;