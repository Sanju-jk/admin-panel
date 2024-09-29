import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

export default function JobCategory() {
  let [allrole, setAllRole] = useState([]);

  const getRole = () => {
    fetch("https://easytohire.in/testapi/myapi/alllrole")
      .then(res => res.json())
      .then(roleArray => {
        setAllRole(roleArray);
      });
  };

  useEffect(() => {
    getRole();
  }, []);

  let [searchInput, setSearchInput] = useState("");

  // Pagination code
  const PER_PAGE = 28; // displays 28 items/records per page
  const [currentPage, setCurrentPage] = useState(0);
  
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(allrole.length / PER_PAGE);

  return (
    <div className="container mt-4">
      <div className="row mb-5">
        <div className="col-lg-8 text-center">
          <h3 className="text-light">
            <i className="fa fa-table text-info"></i> Manage Job Category: {allrole.length}
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

      <div className="row">
        {allrole.slice(offset, offset + PER_PAGE).map((role, index) => {
          if (role.rolename.toLowerCase().match(searchInput.toLowerCase())) // search 
            return (
              <div className="col-lg-3 mb-4" key={index}>
                <div className="p-3 shadow bg-dark text-light rounded">
                  <p className="m-0">{role.rolename}</p>
                </div>
              </div>
            );
        })}
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
        activeClassName={"active bg-primary"}
        activeLinkClassName={"bg-danger text-light border-danger"}
      />
    </div>
  );
}
