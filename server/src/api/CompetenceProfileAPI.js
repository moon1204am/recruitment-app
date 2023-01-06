'use strict'

const RequestHandler = require('./RequestHandler');

/**
 * A REST API concerning the Comptenceprofile with corresponding competence
 * @author Jinglan Qin
 */
class CompetenceProfileAPI extends RequestHandler {

    constructor(){
      super();  
    }
    /*
    * Return path of the competence profile.
    */
    get path(){
        return CompetenceProfileAPI.APPLICANT_API_PATH; 
    }
    /*
    *Get competence profile
    */
    static get APPLICANT_API_PATH() {
        return '/competenceprofile';
    }
    /**
     * Sets upp the methods conserning competenceprofile in the api.
     * Checks if call is authenticated
     * Return competenceprofile with competence.
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

                    const comptenceProfile = await this.controller.findAllCompetenceProfile();
               

                    if(comptenceProfile.length === 0){
                        this.sendHttpResponse(res, 404, 'No competence profile');
                        return;
                    }

                    this.sendHttpResponse(res, 200, comptenceProfile)

                } catch (error) {
                    next(error);
                }
            });

        } catch (error){
            console.log(error);

        }
    }
}
module.exports = CompetenceProfileAPI;