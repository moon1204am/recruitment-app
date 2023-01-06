
import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**
 * A view to show if user is unauthorized to view another page.
 */
function UnauthorizedView(props) {
    const error = props.error;
    let errorMsg = '';
    if(error) {
        errorMsg = error.message;
    } 

    if(errorMsg === "Request failed with status code 401") {
        return( 
            <Container>
                You're session have expired,&nbsp;
                <Link to="/login" >please log back in</Link>
                &nbsp;to continue.
            </Container>
            )
    }
    else if (errorMsg === "Network Error") {
        return (
            <Container>Could not connect to server.</Container>
        )
    }
    else {
        return (
            (
                <Container>
                    You are unauthorized to access this page.
                </Container>)
        )
    }
}

export default UnauthorizedView;