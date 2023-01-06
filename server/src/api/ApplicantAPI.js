'use strict'

const {check, validationResult} = require('express-validator');
const RequestHandler = require('./RequestHandler');
//const Authorization = require('./auth/Authorization');
const { errorFromList } = require('verror');
const e = require('express');
const { checkToken } = require('./authorization/Authorization');

/**
 * A REST API concerning the applicants.
 * @author Marta Hansbo
 */
class ApplicantAPI extends RequestHandler {

    /**
     * Creates a new instance.
     */
    constructor(){
      super();  
    }

    /**
     *  gives the path for applicant api
     */
    get path(){
        return ApplicantAPI.APPLICANT_API_PATH; 
    }

    /**
     * The path for applicant api
     */
    static get APPLICANT_API_PATH() {
        return '/applicants';
    }

    /**
     * Sets upp the methods conserning the applicants available in the api. 
     * checks if call is authenticated.
     * 
     * --> '/' Get all applicants
     */
    async registerHandler(){
        try{
            await this.retriveController();

            this.router.get('/', async (req, res, next)=> {
                try {
                    ///authentication
                    const tokenCheck = await checkToken(req, res)
                    if(!tokenCheck){
                        this.sendHttpResponse(res, 401, 'Invalid Access Token')
                        return;
                    }
                    if(tokenCheck.role == 2){
                        this.sendHttpResponse(res, 401, 'Role does not have access to this call.')
                        return;
                    }
                    ///

                    const applicants = await this.controller.findAllApplicants();


                    if(applicants.length === 0){
                        this.sendHttpResponse(res, 404, 'No applicants');
                        return;
                    }

                    this.sendHttpResponse(res, 200, applicants)

                } catch (error) {
                    next(error);
                }
            });

        } catch (error){
            console.log(error);

        }


    }

    

    

}
module.exports = ApplicantAPI;