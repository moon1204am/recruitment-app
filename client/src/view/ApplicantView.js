import React from 'react';
import {Table, ListGroup} from 'react-bootstrap';

/**
 * The View for the Applicant part of the webpage.
 * @param {*} applicants The applicants to use when redering the view
 * @author Marta Hansbo
 * @returns The html view
 */
function ApplicantView({ applicants }) {
    return (
    <Table striped border="true" hover>
        <thead>
            <tr>
                <th>First Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Availability</th>
                <th>Competence and experience</th>
            </tr>
        </thead>
        <tbody>
            {applicants.data.success.map((applicant) => 
                <tr key={applicant.person_id}>
                    <td>{applicant.name}</td>
                    <td>{applicant.surname}</td>
                    <td>{applicant.email}</td>
                    <td>
                    <ListGroup >
                        {applicant.availability.map((availability) =>
                            <ListGroup.Item variant='light' key={availability.availability_id}> 
                                {availability.from_date} to {availability.to_date}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                    </td>
                    <td>
                    <ListGroup >
                        {applicant.competenceProfile.map((competenceProfiles) =>
                            <ListGroup.Item key={competenceProfiles.competence_profile_id}> 
                                {competenceProfiles.competence.name}: {competenceProfiles.years_of_experience}
                                 {competenceProfiles.years_of_experience <= 1 ? (<> year</>):(<> years</>)}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                    </td>
                </tr>
            )}
        </tbody>
    </Table>
    );
}
export default ApplicantView;