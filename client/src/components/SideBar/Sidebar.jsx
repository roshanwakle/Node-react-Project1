import React, { useState } from 'react'
import GiHamburgerMenu from 'react-icons/fa';
import "../SideBar/SideBar.css"
import { Link } from 'react-router-dom';

export const Sidebar = () => {

    return (
        <>
            {/* <a class="glyphicon glyphicon-th-list" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                Link with href
            </a> */}
            <a style={{ left: "50px" }}>
                <div className='sidebarIcon' data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" ></div>
                <div className='sidebarIcon' data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"></div>
                <div className='sidebarIcon' data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"></div>
            </a>
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Roshan</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="dropdown mt-3">
                        <div class="d-grid gap-2">
                        <Link to="/Product" class="d-grid gap-2">
                                <button class="btn btn-primary" type="button">Product</button>
                            </Link>
                            <Link to="/login" class="d-grid gap-2">
                                <button class="btn btn-primary" type="button">Home</button>
                            </Link>
                            <Link to="/employeeDetails" class="d-grid gap-2">
                                <button class="btn btn-primary" type="button">Employee Details</button>
                            </Link>
                            <Link to="/EditProfile" class="d-grid gap-2">
                            <button class="btn btn-primary" type="button">Edit Profile</button>
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </div></>
    );
};

