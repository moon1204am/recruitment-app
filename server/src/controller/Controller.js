'use strict'

const Validator = require('../util/Validator');
const RecruitmentDAO = require('../integration/RecruitmentDAO');
const PersonDTO = require('../model/PersonDTO');


class Controller{

    /**
     * Creates a new instance of controller
     */
    constructor(){
        this.recruitmentDAO = new RecruitmentDAO();
        this.transactionManager = this.recruitmentDAO.getTransactionManager();
        
    }

    /**
     * Creates a new controller object.
     * @returns {Controller} The newly created controller
     */
    static async createController(){
        const controller = new Controller();
        await controller.recruitmentDAO.createTables();
        return controller;
    }

    /**
     * Calls on database to get all applicants.
     * @returns {PersonDTO[]} An array of applicants.
     * @throws Throws exception if failed to get applicants
     * @author Marta Hansbo
     */
    async findAllApplicants(){
        return this.transactionManager.transaction(async (t1) => {
            return await this.recruitmentDAO.findAllApplicants();
        });
    }

    /**
     * Retrieves all the availabilities from the database
     * @returns {AvailabilityDTO[]} an array of availabilities
     * @throws throws an exception if failed to retrieve the availabilities
     * @author Maya
     */
    async findAllAvailabilities() {
        return this.transactionManager.transaction(async (t1) => {
            return await this.recruitmentDAO.findAllAvailabilities();
        });
    }
    
    /**
     * Retrieves all the competenceProfile from the database
     * @returns {CompetenceProfileDTO[attributes competence{}]} an array of competenceProfile and corresponding competence 
     * @throws throws an exception if failed to retrieve the competenceProfile and competence
     * @author Jinglan qin
     */
    async findAllCompetenceProfile(){
    return this.transactionManager.transaction(async (t1) => {
        return await this.recruitmentDAO.findAllCompetenceProfile();
    })
    }

    /**
     * Retrieves all the Competence from the database
     * @returns {CompetenceDTO[]} an array of competenceand 
     * @throws throws an exception if failed to retrieve the Competence
     * @author Jinglan qin
     */
    async findAllCompetence(){
    return this.transactionManager.transaction(async (t1) => {
        return await this.recruitmentDAO.findAllCompetence();
    })}
    
    /**
     * Sets up tansaction and calls the database to check if user is in database.
     * @param {} username The username of the user
     * @param {*} password The password of the user.
     * @returns array containing the user.
     * @author Marta Hansbo
     */
    async login(username, password){
        return this.transactionManager.transaction(async (t1) =>{
            return await this.recruitmentDAO.findUserByUsernameAndPassword(username, password);
        })
    }
}
module.exports = Controller;