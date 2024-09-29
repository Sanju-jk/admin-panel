import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

export default function CityList() {
  let [allcity, setAllcity] = useState([]);

  const getCity = () => {
    fetch("https://easytohire.in/testapi/myapi/allcity")
      .then(res => res.json())
      .then(cityArray => {
        setAllcity(cityArray);
      });
  };

  useEffect(() => {
    getCity();
  }, []);

  let [searchInput, setSearchInput] = useState("");

  // Pagination code
  const PER_PAGE = 30; // displays 30 items/records per page
  const [currentPage, setCurrentPage] = useState(0);
  
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(allcity.length / PER_PAGE);

  return (
    <div className="container mt-4" style={{ overflowX: "hidden" }}>
      <div className="row mb-3">
        <div className="col-lg-8 text-center">
          <h3 className="text-light mb-4">
            <i className="fa fa-map-marker text-info"></i> Job Locations: {allcity.length}
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

      <div className="row">
        {allcity.slice(offset, offset + PER_PAGE).map((city, index) => {
          if (city.cityname.toLowerCase().match(searchInput.toLowerCase())) {
            return (
              <div className="col-lg-4 mb-4" key={index}>
                <div className="card bg-dark text-light shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{city.cityname}</h5>
                  </div>
                </div>
              </div>
            );
          }
          return null; // Ensure to return null when the condition isn't met
        })}
      </div>

      <div className="mb-4 mt-4">
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
    </div>
  );
}
