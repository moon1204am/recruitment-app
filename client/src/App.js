import React from "react";
import { Route, Routes } from 'react-router-dom';
import Applicants from "./presenter/Applicant";
import Login from './presenter/Login';
import Unauthorized from './view/UnauthorizedView'
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeView from "./view/HomeView";

const ROLES = {
  'Recruiter': 'Recruiter',
  'Applicant': 'Applicant'
}


const App =()=>{
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="" element={<HomeView />} />


            {/* Applicant routes */}
            

            {/* Recruiter routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Recruiter]} />}>
              <Route path="applicants" element={<Applicants/>} />
            </Route>

        </Route>
        </Routes>
  )};

export default App;
