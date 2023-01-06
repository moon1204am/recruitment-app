
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from "react-router-bootstrap"

import React from 'react';

/**
 * View for Navigation bar using React-Bootstrap
 * @author Marta Hansbo
 * @returns itself
 */
export default function navbarView() {
    return(
        <Navbar bg="light" expand="lg">
        <Container>
            <LinkContainer to="/">
           <Navbar.Brand>Recruitment Application</Navbar.Brand>
           </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/applicants" >
                            <Nav.Link>Applicants</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )


}