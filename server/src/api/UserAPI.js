'use strict'


const { sendAuthCookie, refresh } = require('./authorization/Authorization');
const CryptoJS = require("crypto-js");
const {body, validationResult} = require('express-validator');
const RequestHandler = require('./RequestHandler');
//const Authorization = require('./auth/Authorization');
const { errorFromList } = require('verror');
const e = require('express');

/**
 * A REST API concerning the users.
 * @author Marta Hansbo & Maya
 */
class UserAPI extends RequestHandler {

    /**
     * Creates a new instance.
     */
    constructor(){
      super();  
    }

    /**
     *  gives the path for user api
     */
    get path(){
        return UserAPI.USER_API_PATH; 
    }

    /**
     * The path for applicant api
     */
    static get USER_API_PATH() {
        return '/user';
    }

    /**
     * Sets upp the methods conserning the applicants available in the api. 
     * 
     * 
     */
    async registerHandler(){
        try{
            await this.retriveController();

            this.router.get('/'), async (req,res, next)=>{

            }

            this.router.post('/login', async (req, res, next)=> {
                try {

                    body('username').not().isEmpty();
                    body('password').not().isEmpty();
                    const valErr = validationResult(req);
                    if(!valErr.isEmpty()){
                        this.sendHttpResponse(res, 400, valErr.array());
                        return;
                    }
                    const deqryptedUsername = CryptoJS.AES.decrypt(req.body.username, process.env.SECRETKEY).toString(CryptoJS.enc.Utf8).replaceAll('"','');
                    const deqryptedPassword = CryptoJS.AES.decrypt(req.body.password, process.env.SECRETKEY).toString(CryptoJS.enc.Utf8).replaceAll('"','');

                    const user = await this.controller.login(deqryptedUsername, deqryptedPassword);

                    if (user == null || user.length == 0 || user[0].isEmpty) {
                        this.sendHttpResponse(res, 401, 'Invalid username or password.');
                        return;
                      } else {
                        sendAuthCookie(user[0], res);

                        let role = "unknown";
                        if(user[0].role_id == 1){
                            role = "Recruiter";
                        } else if (user[0].role_id == 2){
                            role = "Applicant";
                        }

                        
                        console.log(role)
                        this.sendHttpResponse(res, 200, role);
                        return;
                      }

                } catch(err){
                    next(err);
                }
                
            });

        } catch (error){
            console.log(error);

        }


    }

    

    

}
module.exports = UserAPI;