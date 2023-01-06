'use strict'

const express = require('express');
const Controller = require('../controller/Controller');
const Validator = require('../util/Validator');

/**
 * A superclass for request handlers in the REST API. All components of the API should extend this class.
 */
class RequestHandler{
    /**
     * Creates a new instance and sets the router to the express router.
     */
    constructor(){
        this.router = express.Router();
    }


    /**
     * Returns the URL prefix.
     */
    static get URL_PREFIX(){
        return 'http://'
    }

    /**
     * Creates a new controller.
     */
    async retriveController(){
        this.controller = await Controller.createController();
    }

    /**
     * Sets upp the HTTP response depending on how the call to the database went.
     * @param {*} res The respons.
     * @param {*} status The status code of the responce, 200 if OK.
     * @param {*} body The body of the responce.
     * @returns 
     */
    sendHttpResponse(res, status, body){
        Validator.isIntegerBetween(status, 100, 501);
        if( body === undefined){
            res.status(status).end();
            return;
        }
        let errOrSucc = undefined;
        if(status < 400){
            errOrSucc = 'success';
        } else {
            errOrSucc = 'error';
        }
        res.status(status).json({[errOrSucc]: body});

    }
}
module.exports = RequestHandler;
