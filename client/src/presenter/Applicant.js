import DataSource from "../integration/DataSource"
import React,{useState, useEffect} from "react"
import PromiseNoData from "../components/promiseNoData";
const { default: usePromise } = require("../components/usePromise");
const { default: ApplicantView } = require("../view/ApplicantView");


/**
 * Presenter of the applicant view, sets promise for applicant data. 
 * @returns PromiseNoData or the applicantview.
 * @author Marta Hansbo
 */
function Applicant() {

    const [search, setSearch] = useState(null);

    useEffect(() => {
        setSearch(DataSource.getAllApplicants())
    }, []);

    const [data, error] = usePromise(search);
    
    return (PromiseNoData(search, data, error) || <ApplicantView applicants={data} />)
}
export default Applicant;