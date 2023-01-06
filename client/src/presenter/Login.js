import React, { useState } from 'react';
import LoginView from '../view/LoginView';
import DataSource from '../integration/DataSource';
import { useNavigate, useLocation  } from "react-router-dom";
import { useAuth } from '../contexts/AuthProvider';
const CryptoJS = require("crypto-js");

/**
 * Presenter for Login view, handles submit from view.
 * @returns the LoginView
 * @author Marta Hansbo & Maya
 */
function Login() {
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    //let history = useHistory();
    const {setAuth, auth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    /**
     * Handles an error by setting loading to false and error to true and errorMsg to a specified message to show the user.
     * @param {*} errmsg The message of the error.
     */
    function handleError(errmsg) {
        setLoading(false);
        setErrorMsg(errmsg);
        setError(true);
    }

    /**
     * Handles the submit from the view form. Encrypts the message and contacts datasource to make api call, 
     * if call successful, redirects to new page depending on Users role. (applicant or reqruiter).
     * Handles which error message to show user depending on response from server and if username and password has been specified.
     * @param {*} e 
     */
    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setError(false);

        if(username && password) {
            const u = CryptoJS.AES.encrypt(JSON.stringify(username), process.env.REACT_APP_SECRETKEY).toString();
            const p = CryptoJS.AES.encrypt(JSON.stringify(password), process.env.REACT_APP_SECRETKEY).toString();

            DataSource.postLogin(u, p).then((data) => {
                        if(data.success) {
                            const role = [data?.success];
                            setAuth({username, role});
                            setUser('');
                            setPassword('');
                            navigate(from, { replace: true });
                        }
                        else if (data.error) {
                            handleError(data.error);
                        }
            }).catch((error) => {
                if (error.response) {
                    handleError(JSON.stringify(error.response.data.error).replaceAll('"', ''));
                            /*console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);*/
                } else if (error.request) {
                    handleError("No response from server");
                    //console.log(error.request);
                } else {
                    handleError("Internal server error");
                    //console.log('Error', error.message);
                }
            });
            } else {
                //console.log("no username or password")
                handleError("Please enter a username and password");
        }
    }
  
    return (
        <div>
            <LoginView 
                user={username} 
                onUserChange={(username) => setUser(username)} 
                password={password} 
                onPasswordChange={(password) => setPassword(password)} 
                handleSubmit={handleSubmit}
                loading={loading}
                errorMsg={errorMsg} 
                error={error}
            />
        </div>
    );
}
export default Login;