import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

export default function Jobseeker() {
  let [allUser, setAllUser] = useState([]);

  const getUser = () => {
    fetch("https://easytohire.in/testapi/myapi/allluser")
      .then(res => res.json())
      .then(user => {
        setAllUser(user);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  let [searchInput, setSearchInput] = useState("");

  // Pagination code
  const PER_PAGE = 10; // displays 10 items/records per page
  const [currentPage, setCurrentPage] = useState(0);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(allUser.length / PER_PAGE);

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-lg-8 text-center">
          <h3 className="text-light mb-4">
            <i className="fa fa-user-tie text-info"></i> Manage Job Seeker: {allUser.length}
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

      <div className="table-responsive" style={{ overflowX: "hidden" }}>
        {allUser.slice(offset, offset + PER_PAGE).map((user, index) => {
          if (user.fullname.toLowerCase().match(searchInput.toLowerCase())) // search
            return (
              <div className="row shadow-sm mb-5 bg-dark text-light p-3 rounded" key={index}>
                <div className="col-lg-3">
                  <b>{user.fullname || "Alex"}</b>
                  <p>Gender: {user.gender}</p>
                  <p>DOB: {user.dob}</p>
                  <p>Experience: {user.totalexp}</p>
                  <p>About Experience: {user.aboutexp}</p>
                </div>

                <div className="col-lg-3">
                  <p>Mobile: {user.mobile}</p>
                  <p>Email: {user.email} <b className="text-danger">(Verified: {user.active})</b></p>
                  <p>Password: {user.password}</p>
                  <p>Address: {user.address}</p>
                </div>

                <div className="col-lg-3">
                  <p>College: {user.college}</p>
                  <p>Education: {user.educationame}</p>
                  <p>Passing Year: {user.passingyear}</p>
                  <p>Grade / Marks: {user.grade}</p>
                </div>

                <div className="col-lg-3">
                  <b>Skills</b>
                  <p>{user.skill}</p>
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
        activeClassName={"active"}
        activeLinkClassName={"bg-danger text-light border-danger"}
      />
    </div>
  );
}
