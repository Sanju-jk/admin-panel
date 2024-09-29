import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

export default function Job() {
  let [alljob, setAllJob] = useState([]);

  const getJob = () => {
    fetch("https://easytohire.in/testapi/myapi/alljob")
      .then(res => res.json())
      .then(jobArray => {
        setAllJob(jobArray);
      });
  };

  useEffect(() => {
    getJob();
  }, []);

  let [searchInput, setSearchInput] = useState("");

  // Pagination code
  const PER_PAGE = 6; // displays 6 items/records per page
  const [currentPage, setCurrentPage] = useState(0);
  
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(alljob.length / PER_PAGE);

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-lg-8 text-center">
          <h3 className="text-light">
            <i className="fa fa-database text-info"></i> Manage Jobs: {alljob.length}
          </h3>
        </div>
        <div className="col-lg-4">
          <input
            type="text"
            placeholder="Search.."
            className="form-control bg-dark text-light border-secondary"
            onChange={e => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      {alljob.slice(offset, offset + PER_PAGE).map((job, index) => {
        if (job.jobtitle.toLowerCase().match(searchInput.toLowerCase())) // search
          return (
            <div className="row mb-5 mt-4 shadow p-3 bg-dark text-light rounded" key={index}>
              <div className="col-lg-2">
                <h5 className="text-primary">{job.jobtitle}</h5>
                <p>Salary: {job.minsal} to {job.maxsal}</p>
                <p>Experience: {job.minexp} to {job.maxexp} Yrs</p>
                <p>Location: {job.location}</p>
              </div>
              <div className="col-lg-3">
                <p>Job Role: {job.role}</p>
                <p>Applied: {job.totalprofile}</p>
                <p>Shortlisted: {job.sortlisted}</p>
                <p>Job Open: {job.active}</p>
              </div>
              <div className="col-lg-6">
                <b>Job Description</b>
                <p>{job.jd}</p>
              </div>
            </div>
          );
      })}

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center mt-4"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link bg-dark text-light border-secondary"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link bg-dark text-light border-secondary"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link bg-dark text-light border-secondary"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link bg-dark text-light border-secondary"}
        activeClassName={"active"}
        activeLinkClassName={"bg-danger text-light border-danger"}
      />
    </div>
  );
}
