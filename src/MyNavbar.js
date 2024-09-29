import React from 'react';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';

const MyNavbar = () => {
    const logOut = () => {
        swal({
            title: "Are you sure?",
            text: "Do you really want to log out?",
            icon: "warning",
            buttons: ["No", "Yes"],
            dangerMode: true,
        }).then((willLogout) => {
            if (willLogout) {
                localStorage.clear(); // Clear local storage
                window.location.reload(); // Reload the page to apply changes
            }
        });
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow sticky-top">
            <div className="container">
                {/* Logo aligned to the left */}
                <NavLink className="navbar-brand text-info" exact to="/">
                    <i className="fa fa-users fa-lg me-2"></i> EasyToHire
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Content */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink exact className="nav-link" to="/" activeClassName="active">
                                <i className="fa fa-home me-1"></i> Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/company" activeClassName="active">
                                <i className="fa fa-building me-1"></i> Manage Company
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/jobseeker" activeClassName="active">
                                <i className="fa fa-user-tie me-1"></i> Job Seeker
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/category" activeClassName="active">
                                <i className="fa fa-table me-1"></i> Job Category
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/jobs" activeClassName="active">
                                <i className="fa fa-database me-1"></i> Manage Jobs
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/jobcity" activeClassName="active">
                                <i className="fa fa-map-marker me-1"></i> Job Location
                            </NavLink>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button className="btn btn-outline-danger" onClick={logOut}>
                                <i className="fa fa-sign-out me-2"></i> {localStorage.getItem("fullname")} - Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default MyNavbar;
