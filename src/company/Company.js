import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

export default function Company() {
  let [allCompany, setAllCompany] = useState([]);

  const getCompany = () => {
    fetch("https://easytohire.in/testapi/myapi/alllcompany")
      .then(res => res.json())
      .then(companyArray => {
        setAllCompany(companyArray);
      });
  };

  useEffect(() => {
    getCompany();
  }, []);

  let [searchInput, setSearchInput] = useState("");

  // Pagination code
  const PER_PAGE = 10; // displays 10 items/records per page
  const [currentPage, setCurrentPage] = useState(0);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(allCompany.length / PER_PAGE);

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-lg-8 text-center">
          <h3 className="text-light mb-4">
            <i className="fa fa-building text-info"></i> Manage Company: {allCompany.length}
          </h3>
        </div>
        <div className="col-lg-4">
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary"
            placeholder="Search.."
            onChange={e => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email ID</th>
              <th>Password</th>
              <th>Mobile</th>
              <th>Location</th>
              <th>Address</th>
              <th>PAN</th>
            </tr>
          </thead>

          <tbody>
            {allCompany.slice(offset, offset + PER_PAGE).map((company, index) => {
              if (company.fullname.toLowerCase().includes(searchInput.toLowerCase()))
                return (
                  <tr key={index}>
                    <td>{company.fullname} - {company.type}</td>
                    <td>{company.email}</td>
                    <td>{company.password}</td>
                    <td>{company.mobile}</td>
                    <td>{company.city}</td>
                    <td>{company.address}</td>
                    <td>{company.pan}</td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>

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
        activeClassName={"active"} // Added for styling active class
        activeLinkClassName={"bg-danger text-light border-danger"} // Set active link background color to red
      />
    </div>
  );
}
