import React from "react";
import { Link } from "react-router-dom";


export const Footer = () => {

    return (<footer className="footer footer-transparent d-print-none">
        <div className="container-xl">
            <div className="row text-center align-items-center flex-row-reverse">
                <div className="col-lg-auto ms-lg-auto">
                    <ul className="list-inline list-inline-dots mb-0">
                        <li className="list-inline-item">
                            <Link to="/dashboard" className="link-secondary">
                                Dashboard
                            </Link>
                        </li>
                        <li className="list-inline-item">
                            <a href="#" className="link-secondary">
                                Website
                            </a>
                        </li>
                    
                    </ul>
                </div>
                <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                    <ul className="list-inline list-inline-dots mb-0">
                        <li className="list-inline-item">
                            Copyright © 2022&emsp;
                            <a href="/dashboard" className="link-secondary">
                                Zakat initiative
                            </a>
                            . All rights reserved.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    )
}