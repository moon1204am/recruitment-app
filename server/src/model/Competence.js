'use strict';

const Sequelize = require('sequelize');
const CompetenceProfile = require('./CompetenceProfile');

/**
 * An competence in the recruitment app
 * @author Jinglan Qin
 */
class Competence extends Sequelize.Model {
    /**
     * The name of the competence model.
     */
    static get COMPETENCE_PROFILE_MODEL_NAME() {
        return 'competence';
    }

    /**
     * Defines the Competence entity
     * @param {Sequelize} sequelize the sequelize object.
     * @param {Models} models an instance of the models class, which contains all other models. used to create associations.
     * @return {Model} a sequelize model describing the Competenceentity.
     */
    static createModel(sequelize) {
        Competence.init(
            {
                competence_id:{
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                name:{
                    type: Sequelize.STRING,
                },
            },
            {sequelize, modelName: Competence.COMPETENCE_PROFILE_MODEL_NAME, paranoid: true}
        );
        
        return Competence;
    }
}
module.exports = Competence;