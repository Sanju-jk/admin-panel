import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"


import Dashboard from "./Dashboard";
import MyNavbar from "./MyNavbar";
import Company from "./company/Company";
import Jobseeker from "./jobseeker/Jobseeker";
import JobCategory from "./company/JobCategory";
import Job from "./company/Job";
import CityList from "./company/City";

function App() {
  return (
    <Router>

      <MyNavbar />

      <Routes>
         <Route exact path='/' element={<Dashboard />} />
         <Route exact path='/company' element={<Company />} />
         <Route exact path='/jobseeker' element={<Jobseeker />} />
         <Route exact path='/category' element={<JobCategory />} />
         <Route exact path='/jobs' element={<Job />} />
         <Route exact path='/jobcity' element={<CityList />} />

      </Routes>

    </Router>
  );
}

export default App;
