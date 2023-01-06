'use strict';

const Sequelize = require('sequelize');
const Availability = require('./Availability');
const CompetenceProfile = require('./CompetenceProfile');

/**
 * a class representing an person in the reqruitment application.
 * @author Marta Hansbo, Maya added associations between person and availability
 */
class Person extends Sequelize.Model{

    /**
     * The name of the person model.
     */
    static get PERSON_MODEL_NAME(){
        return 'person';
    }

    /**
     * Defines athe Person entity.
     * @param {*} sequelize The sequlize object
     * @returns 
     */
    static createModel(sequelize){
        Person.init(
            {
                person_id:{
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                surname:{
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                pnr:{
                    type: Sequelize.STRING,
                    
                },
                email:{
                    type: Sequelize.STRING,
                    
                },
                role_id:{
                    type: Sequelize.INTEGER,
                },
                username:{
                    type: Sequelize.STRING,
                },
                
            }, {sequelize, modelName: Person.PERSON_MODEL_NAME, paranoid: true}
        );
        
        Person.hasMany(Availability, {foreignKey: 'person_id'});
        Availability.belongsTo(Person,{foreignKey: 'person_id'});
        Person.hasMany(CompetenceProfile, {foreignKey: 'person_id'});
        CompetenceProfile.belongsTo(Person, {foreignKey: 'person_id'});
     
        return Person;
    }
}
module.exports = Person;