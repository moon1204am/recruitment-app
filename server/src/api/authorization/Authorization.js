'use strict';
const jwt = require('jsonwebtoken');

/**
 * Class for authorization useing JWT
 */
class Authorization{

    /**
     * Checks if JWT token is valid
     * @param {*} req 
     * @param {*} res 
     * @returns returns false if no token is found, the decrypted tokenpayload if verified and throws error if 
     * token is not valid.
     * @author Marta Hansbo
     */
    static async checkToken(req, res){

        const token = req.cookies.accessToken;
        //const { exp } = req.cookies.accessToken.jwtToken.expiresIn;

        console.log(token);
        let tokenPayload;
        try {
            tokenPayload = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            console.log("token is invalid")
            return false;
        }

        /*if(!token || Date.now() >= exp * 1000 ){
            console.log("token is false");
            return false;
        }*/
        
        /*const tokenPayload = jwt.verify(token, process.env.JWT_SECRET)*/
        return tokenPayload;
    }


    /**
     * Adds an auth cookie to http responce.
     * @param {*} user The user to get an auth cookie
     * @param {*} res the http response onbject
     * @author Maya
     */
    static sendAuthCookie(user, res){
        const notAccessibleFromJs = {httpOnly: true};
        const isSessionCookie = {expires: 0};

        const jwtToken = jwt.sign(
            {id: user.user_id, username: user.username, role: user.role_id},
            process.env.JWT_SECRET,
            {
            expiresIn: 10, //86400,
            },
        );

        const cookieOptions = {
        ...notAccessibleFromJs,
        ...isSessionCookie,
        };
        res.cookie("accessToken", jwtToken, cookieOptions);

    }


}

module.exports = Authorization;