'use strict';
const Sequelize = require('sequelize');
const Competence = require('./Competence');


/**
 * An competence profile in the recruitment app
 * @author Jinglan Qin
 */
class CompetenceProfile extends Sequelize.Model {
    /**
     * The name of the competence profile model.
     */
    static get COMPETENCE_PROFILE_MODEL_NAME() {
        return 'competence_profile';
    }

    /**
     * Defines the CompetenceProfile entity
     * @param {Sequelize} sequelize the sequelize object.
     * @param {Models} models an instance of the models class, which contains all other models. used to create associations.
     * @return {Model} a sequelize model describing the CompetenceProfile entity.
     */
    static createModel(sequelize) {
        CompetenceProfile.init(
            {
                competence_profile_id :{
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                },
                competence_id:{
                    type: Sequelize.INTEGER,
                },
                years_of_experience:{
                    type : Sequelize.DECIMAL,
                },
                person_id :{
                    type : Sequelize.INTEGER,
                }
            },
            {sequelize, modelName: CompetenceProfile.COMPETENCE_PROFILE_MODEL_NAME, paranoid: true}
        );
        CompetenceProfile.belongsTo(Competence, {foreignKey: 'competence_id'});
        Competence.hasMany(CompetenceProfile,{foreignKey: 'competence_id' });
      
        return CompetenceProfile;
    }
}
module.exports = CompetenceProfile;