'use strict';

const cls = require("cls-hooked");
const Sequelize = require("sequelize");
const WError = require('verror').WError;
const Validator = require('../util/Validator');
const PersonDTO = require('../model/PersonDTO');
const Person = require('../model/Person')
const Availability = require('../model/Availability');
const AvailabilityDTO = require('../model/AvailabilityDTO');
const CompetenceProfile = require('../model/CompetenceProfile');
const CompetenceProfileDTO = require('../model/CompetenceProfileDTO');
const Competence = require('../model/Competence');
const CompetenceDTO = require('../model/CompetenceDTO');
const { Model } = require("sequelize");
var CryptoJS = require("crypto-js");
const UserDTO = require('../model/UserDTO')


/**
 * 
 * This class is responsible for communication between the application 
 * and the database.
 */
class RecruitmentDAO{

    /**
     * Constructor for RecruitmentDAO, sets up connection to database and creates the sequalize models.
     * @author Marta Hansbo, Maya
     */
    constructor(){
        const namespace = cls.createNamespace("rec-db");
        Sequelize.useCLS(namespace);
        this.database = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASS,
            {host: process.env.DB_HOST, port: process.env.DB_PORT, dialect: process.env.DB_DIALECT, define: {timestamps: false, freezeTableName: true},}
        );
        Competence.createModel(this.database);
        Availability.createModel(this.database);
        CompetenceProfile.createModel(this.database);
        Person.createModel(this.database);

    }

    /**
     * Return transaction manager, which is this database object
     * @returns database object
     */
    getTransactionManager(){
        return this.database;
    }

    /**
     * Authenticates and syncs models to database.
     */
    async createTables(){
        try{
            await this.database.authenticate();
            await this.database.sync({force:false});
            
        } catch (error){
            throw new WError(
                {
                    cause:error,
                    info:{ RecruitmentDAO: 'failed to call authenticate and sync'}
                }, 'could not connect to database'
            )
        }
    }


    /**
     * Lists all Applicants and their availability. 
     * @returns {PersonDTO[]} An array of all Applicants containing their personal information and an array with their availability.
     * @throws throws exception if failed to find Applicants.
     * @author Marta Hansbo + Maya (added availability functionality)
     *  @author Jinglan Qin (added competenceProfile and competence functionality)
     */
    async findAllApplicants(){
        try {
            const persons = await Person.findAll({
                where: {
                    role_id: 2,
                },
                include:[
                    {model:CompetenceProfile, include: [{model: Competence}]},
                    {model: Availability },
                    ]
            });
            return persons.map((personModel) => 
            this.createPersonDTO(personModel, personModel.availabilities, personModel.competence_profiles)
            );
        } catch(error) {
            console.log(error);
            throw new WError(
                {
                    cause:error,
                    info: {
                        RecruitmentDAO: 'Failed to find applicants'
                    },
                },
                'Could not find applicants'
            );
        }

    }



    /**
     * Lists all availabilities.
     * @return {Availability[]} an array with all availabilities
     * @throws throws exception if failed to find the availabilities
     * @author Maya
     */
    async findAllAvailabilities() {
        try {
            const availabilities = await Availability.findAll(); 
            return availabilities.map((availabilityModel) => this.createAvailabilityDTO(availabilityModel),
            );
        } catch (err) {
            throw new WError({
                cause: err,
                info: { 
                    RecruitmentDAO: 'Failed to find availabilities.',
                },
            },
            `Could not read availabilities.`,
            );
        }
    }
    
    /**
     * Lists all competence profile
     * @return {CompetenceProfile[ attributes competence{}]} an array with all competence profile and 
     * corresponding competence.
     * @throws throws exception if failed to find the availabilities
     * @author Jinglan Qin
     */
     async findAllCompetenceProfile(){
        try{
            const competenceProfiles = await CompetenceProfile.findAll({
                include: [{model: Competence}]
            }
        );
            return competenceProfiles.map((competenceProfileModel) => 
            this.createCompetenceProfileDTO(competenceProfileModel, competenceProfileModel.competence),
            );
    
        } catch(error) {
            throw new WError({
                cause: error,
                info: {
                    RecruitmentDAO: 'Failed to find competenceProfile.',
                },
            },
            `Could not read competenceProfile.`,
            );
        }
    }

     /**
     * Lists all competence
     * @return {Competence[]} an array with all competence.
     * @throws throws exception if failed to find the availabilities
     * @author Jinglan Qin
     */
    async findAllCompetence() {
        try {
            const competences = await Competence.findAll(); 
            return competences.map((competenceModel) => this.createCompetenceDTO(competenceModel),
            );
        } catch (err) {
            throw new WError({
                cause: err,
                info: { 
                    RecruitmentDAO: 'Failed to find competence.',
                },
            },
            `Could not read competence.`,
            );
        }
    }
    




    /**
     * Finds user by username and password.
     * @param {*} username 
     * @param {*} password 
     * @returns returns array containing one user
     * @author Marta Hansbo
     */
    async findUserByUsernameAndPassword(username, password){
        try{
            console.log("password = "+password)
            var psw = CryptoJS.SHA256(password).toString();
            console.log(psw);

            const users = await Person.findAll({
                where: {username: username, password: psw}
            })
            //console.log(users);
            return users.map((personModel) => this.createUserDTO(personModel));

        } catch (err) {
            console.log(err);
            throw new WError(
                {
                    cause:err,
                    info: {
                        RecruitmentDAO: 'Failed to find user'
                    },
                },
                'Could not find user'
            );
        }
    }

    /**
     * 
     * @param {*} personModel 
     * @returns
     * @author Marta Hansbo
     */
    createUserDTO(personModel){
        return new UserDTO(
            personModel.person_id,
            personModel.name,
            personModel.surname,
            personModel.role_id,
            personModel.username
        );
    }

    /**
     * Creates and return a DTO based on a personModel and availabilityModel
     * @param {*} personModel An object containing information about the person
     * @param {*} availabilityModel[] an array containing information about the persons availability-
     * @returns A PersonDTO containing personal information and availability
     * @author Marta Hansbo
     */
    createPersonDTO(personModel, availabilityModel, competenceProfileModel){
        return new PersonDTO(
            personModel.person_id,
            personModel.name,
            personModel.surname,
            personModel.pnr,
            personModel.email,
            personModel.role_id,
            personModel.username,
            this.nestedAvailabilities(availabilityModel),
            this.nestedCompetenceProfile(competenceProfileModel),
        );
    }

    /**
     * Maps an array of availabilities and returns an array containing AvailabilityDTOs
     * @param {*} availabilityModel[] an array of availabilities
     * @returns An array of AvailabilityDTOs
     * @author Marta Hansbo
     */
    nestedAvailabilities(availabilityModel){
        return availabilityModel.map( (avmodel) => this.createAvailabilityDTO(avmodel));
    }

     /**
     * @param {*} CompetenceProfileModel 
     * @returns CompetenceProfileDTO with CompetenceDTO inside
     * @author Jinglan Qin
     */
      nestedCompetenceProfile(CompetenceProfileModel){
        return CompetenceProfileModel.map((avmodel) => this.createCompetenceProfileDTO(avmodel));
    }


    /**
     * Takes an object containing availability and creates an AvailabilityDTO
     * @param {*} availabilityModel An object containing information about availability
     * @returns A AvailabilityDTO containing information about availability.
     * @author Maya
     */
    createAvailabilityDTO(availabilityModel) {
        return new AvailabilityDTO(
            availabilityModel.availability_id,
            availabilityModel.person_id,
            availabilityModel.from_date,
            availabilityModel.to_date
        );
    }
     /**
     * @param {*} CompetenceProfileModel 
     * @returns CompetenceProfileDTO with corresponding competenceDTO inside CompetenceProfileDTO array 
     * @author Jinglan Qin
     */
      createCompetenceProfileDTO(competenceProfileModel) {
        return new CompetenceProfileDTO(
            competenceProfileModel.competence_profile_id,
            competenceProfileModel.competence_id,
            competenceProfileModel.years_of_experience,
            competenceProfileModel.person_id,
            this.createCompetenceDTO(competenceProfileModel.competence),
        );
    }
   
    /**
     * @param {*} CompetenceModel 
     * @returns CompetenceDTO
     * @author Jinglan Qin
     */
    createCompetenceDTO(competenceModel){
        return new CompetenceDTO(
            competenceModel.competence_id,
            competenceModel.name,
        );
    }

}


module.exports = RecruitmentDAO;