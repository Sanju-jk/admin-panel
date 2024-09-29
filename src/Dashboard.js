import { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState({
    companies: [],
    users: [],
    jobs: [],
    roles: [],
  });

  // Reusable function for fetching data
  const fetchData = async (endpoint, key) => {
    try {
      const response = await fetch(`https://easytohire.in/testapi/myapi/${endpoint}`);
      const result = await response.json();
      setData(prevState => ({ ...prevState, [key]: result }));
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
    }
  };

  // Fetch all data on mount
  useEffect(() => {
    fetchData("alllcompany", "companies");
    fetchData("allluser", "users");
    fetchData("alljob", "jobs");
    fetchData("alllrole", "roles");
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-5 text-center text-light">EasyToHire Dashboard</h1>

      <div className="row text-center">
        <DashboardCard
          title={`${data.companies.length} Companies`}
          iconClass="fa-building"
          iconColor="text-primary"
          bgClass="bg-dark"
        />
        <DashboardCard
          title={`${data.users.length} Job Seekers`}
          iconClass="fa-users"
          iconColor="text-warning"
          bgClass="bg-dark"
        />
        <DashboardCard
          title={`${data.jobs.length} Jobs`}
          iconClass="fa-suitcase"
          iconColor="text-success"
          bgClass="bg-dark"
        />
        <DashboardCard
          title={`${data.roles.length} Job Categories`}
          iconClass="fa-table"
          iconColor="text-danger"
          bgClass="bg-dark"
        />
      </div>
    </div>
  );
}

// Reusable Dashboard Card component for cleaner code
function DashboardCard({ title, iconClass, iconColor, bgClass }) {
  return (
    <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
      <div
        className={`${bgClass} rounded shadow-lg pt-4 pb-4 dashboard-card hover-card`}
        style={{ transition: "transform 0.3s", cursor: "pointer" }}
      >
        <i className={`fa ${iconClass} fa-3x ${iconColor}`} />
        <h4 className="text-light mt-3">{title}</h4>
      </div>
    </div>
  );
}
