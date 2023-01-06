'use strict';
const Sequelize = require('sequelize');
const AvailbilityDTO = require('./AvailabilityDTO');
const Person = require('./Person');
const CompetenceProfile = require('./CompetenceProfile');

/**
 * An availability in the recruitment app
 * @author Maya
 */
class Availability extends Sequelize.Model {
    /**
     * The name of the Availability model.
     */
    static get AVAILABILITY_MODEL_NAME() {
        return 'availability';
    }

    /**
     * Defines the Availability entity.
     * @param {Sequelize} sequelize the sequelize object.
     * @return {Model} a sequelize model describing the Availability entity.
     */
    static createModel(sequelize) {
        Availability.init(
            {
                availability_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                from_date: {
                    type: Sequelize.DATE,
                },
                to_date: {
                    type: Sequelize.DATE,
                },
            },
            {sequelize, modelName: Availability.AVAILABILITY_MODEL_NAME, paranoid: true}
        );
        
        return Availability;
    }
}
module.exports = Availability;