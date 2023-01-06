import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import UnauthorizedView from "../view/UnauthorizedView";

/**
 * Takes promise, data and error and visualizes three cases, if the promise is not finished,
 * if an error occures or if no data is returned from the promise.
 * @param {*} promise 
 * @param {*} data 
 * @param {*} error
 * @author Marta Hansbo
 * @returns a view
 */
function PromiseNoData(promise, data, error) {
	return (
		(!promise && "no data") ||
		(error && <UnauthorizedView error={error} />) ||
		(!data && (
            <Spinner animation="border" role="status"></Spinner>
		))
	);
}
export default PromiseNoData;