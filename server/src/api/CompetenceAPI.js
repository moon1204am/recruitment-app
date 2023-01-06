'use strict'

const RequestHandler = require('./RequestHandler');

/**
 * A REST API concerning the Comptence
 * @author Jinglan Qin
 */
class CompetenceAPI extends RequestHandler {

    constructor(){
      super();  
    }
    /*
    * Return the path for the competence API
    */
    get path(){
        return CompetenceAPI.APPLICANT_API_PATH; 
    }
    /*
    * Get path for the competence API
    */
    static get APPLICANT_API_PATH() {
        return '/competence';
    }
    /**
     * Sets upp the methods conserning competence in the api.
     * Checks if call is authenticated
     * Return competence.
     */

    async registerHandler(){
        try{
            await this.retriveController();

            this.router.get('/', async (req, res, next)=> {
                try {
                    //authentication by Marta Hansbo
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

                    const comptence = await this.controller.findAllCompetence();
               

                    if(comptence.length === 0){
                        this.sendHttpResponse(res, 404, 'No competence ');
                        return;
                    }

                    this.sendHttpResponse(res, 200, comptence)

                } catch (error) {
                    next(error);
                }
            });

        } catch (error){
            console.log(error);

        }
    }
}
module.exports = CompetenceAPI;