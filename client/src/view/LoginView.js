import React from 'react';
import { Form, Button, FloatingLabel, Row, Col, Spinner, Alert } from 'react-bootstrap';

/**
 * The Login view handles loading by rendering a spinner. Uses React-bootstrap.
 * @returns itself
 * @author Maya
 */
function LoginView({ user, onUserChange, password, onPasswordChange, handleSubmit, loading, errorMsg, error }) {

    return (
        <div>
            {loading ? (
                <Spinner animation="border" role="status"></Spinner>
            ) : (
                <Row className="align-items-center">
                    <Col>
                    <Alert show={error} variant="danger">
                        {errorMsg}
                    </Alert>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group  controlId="formBasicEmail">
                                <FloatingLabel label="Username" className="mb-3" >
                                    <Form.Control type="text" placeholder="Username" value={user} onChange={(e) => {onUserChange(e.target.value)}}/>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <FloatingLabel label="Password" className="mb-3">
                                    <Form.Control placeholder="Password" type="password"  value={password} onChange={(e) => {onPasswordChange(e.target.value)}}/>
                                </FloatingLabel>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                    <Col>
                        <div>
                            Are you new?  
                            {/* warning put router link here */}
                            <a href="#"> Register Here</a>
                        </div>
                    </Col>
                </Row>
            )}
        </div>
    );
}
export default LoginView;