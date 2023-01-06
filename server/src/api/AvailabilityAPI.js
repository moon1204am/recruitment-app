'use strict';

const RequestHandler = require('./RequestHandler');

const {check, validationResult} = require('express-validator');
//const Authorization = require('./auth/Authorization');
const { errorFromList } = require('verror');
const e = require('express');
const ApplicantAPI = require('./ApplicantAPI');

/**
 * The REST API conserning availablilities
 * @author Maya
 */
class AvailabilityAPI extends RequestHandler {
    /**
     * Creates a new instance.
     */
    constructor() {
        super();
    }

    /**
     * Gives the path for the Availability api
     */
    get path() {
        return AvailabilityAPI.AVAILABILITY_API_PATH;
    }

    /**
     * The path for the availability api
     */
    static get AVAILABILITY_API_PATH() {
        return '/availabilities';
    }

    /**
     * Sets upp the methods conserning availabilities available in the api.
     * Checks if call is authenticated
     * 
     * --> '/' Get all availabilities
     */
    async registerHandler() {
        try {
            await this.retriveController();
            this.router.get('/', async (req, res, next) => {
                try {
                    //authentication
                    const tokenCheck = await checkToken(req, res)
                    if(!tokenCheck){
                        this.sendHttpResponse(res, 401, 'Unvalid Access Token')
                        return;
                    }
                    if(tokenCheck.role == 2){
                        this.sendHttpResponse(res, 401, 'Role does not have access to this call.')
                        return;
                    }
                    ///

                const availabilities = await this.controller.findAllAvailabilities();
                if(availabilities.length === 0) {
                    this.sendHttpResponse(res, 404, 'No availabilities');
                    return;
                }
                this.sendHttpResponse(res, 200, availabilities);
            } catch (err) {
                next(err);
            }
            });
        } catch (err) {
            console.log(err);
        }
    }

    convertApplicantIdToUrl(availability) {
        availability.applicant = RequestHandler.URL_PREFIX + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT + ApplicantAPI.APPLICANT_API_PATH + '/' + availability.applicant.person_id;
    }
}

module.exports = AvailabilityAPI;

