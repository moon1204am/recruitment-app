'use strict'

const ApplicantAPI = require('./ApplicantAPI');
const AvailabilityAPI = require('./AvailabilityAPI');
const ComptenceProfileAPI= require('./CompetenceProfileAPI');
const CompetenceAPI = require('./CompetenceAPI');
const UserAPI = require('./UserAPI');



/**
 * Class that loads all the components of the REST API
 */
class RequestHandlerLoader {

  /**
   * Creates a new instance with Array containing the Request handlers.
   */
    constructor(){
        this.reqHandlers = [];
    }

    /**
     * Add a request handler to the array of request handlers.
     * @param {*} reqHandler The request handler to add.
     */
    addRequestHandler(reqHandler) {
        this.reqHandlers.push(reqHandler);
      }

    /**
     * Registers the request handlers in the specified app and sets the app to use the request handlers path and router.
     * @param {*} app The app to load the handlers to.
     */
    loadHandlers(app) {
        this.reqHandlers.forEach((reqHandler) => {
          reqHandler.registerHandler();
          app.use(reqHandler.path, reqHandler.router);
        });
    }
}

const loader = new RequestHandlerLoader();
loader.addRequestHandler(new CompetenceAPI());
loader.addRequestHandler(new AvailabilityAPI());
loader.addRequestHandler(new ComptenceProfileAPI());
loader.addRequestHandler(new ApplicantAPI());
loader.addRequestHandler(new UserAPI());


module.exports = loader;