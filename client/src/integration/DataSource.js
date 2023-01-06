import axios from '../http-common';

/**
 * Integration with database API calls
 */
const DataSource = {

    /**
     * The actual api call
     * @param {} endpoint the enpoint to call
     * @returns a promise
     */
    apiCall(endpoint, method, data) {
        if(method === "GET") {
            if(data != null) {
                const params = new URLSearchParams(data);
                return axios.get(endpoint+"?"+params);
            } else {
                return axios.get(endpoint);
            }
        } else if(method === "POST") {
            return axios.post(endpoint, data);
        }
    },

    /**
     * Makes a API call to "/applicants" to fetch all information about all applicants
     * @returns a promise
     */
    getAllApplicants(){
        return this.apiCall("/applicants", "GET");
    },

    /**
     * 
     * @param {*} username 
     * @param {*} password 
     * @returns 
     */
    postLogin(username, password){
        return this.apiCall("/user/login", "POST", { username: username, password: password }).then(response=> { 
            return response.data;
        });
    },

    refreshToken(){
        return this.apiCall("/user/refresh", "GET").then(response => {
            return response.data;
        })
    }

}
export default DataSource;