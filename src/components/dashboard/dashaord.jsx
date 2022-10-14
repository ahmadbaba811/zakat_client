import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { setBranchList, setLoginDetails } from "../../action/action";
import { serverLink } from "../../constants/url";
import Loader from "../common/loader";
import Modal from "../common/modal/modal";
import SuccessModal from "../common/modal/successmodal";
// import {SuccessModal} from "../common/modal/successmodal";
const DashBoards = (props) => {
    const token = props.loginData[0].token
    const [isLoading, setIsLoading] = useState(true)
       
    useEffect(()=>{
        getBranches();
    },[])

    const getBranches=async()=>{
        await axios.get(`${serverLink}settings/branch/list`, token).then((res)=>{
            props.setOnBranchList(res.data);
            setTimeout(() => {
                setIsLoading(false)
            }, 3000);     
        })
    }

    return isLoading ? (<Loader/>) : (
        <div className="page-wrapper">
            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            {/* Page pre-title */}
                            <h2 className="page-title">Dashboard</h2>
                        </div>
                        {/* Page title actions */}
                        <div className="col-12 col-md-auto ms-auto d-print-none">
                            <div className="btn-list">
                                <span className="d-none d-sm-inline">
                                    <a href="#" className="btn btn-white">
                                        New view
                                    </a>
                                </span>
                                <a
                                    href="#"
                                    className="btn btn-primary d-none d-sm-inline-block"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modal-report"
                                >
                                    {/* Download SVG icon from http://tabler-icons.io/i/plus */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="icon"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <line x1={12} y1={5} x2={12} y2={19} />
                                        <line x1={5} y1={12} x2={19} y2={12} />
                                    </svg>
                                    Create new report
                                </a>
                                <a
                                    href="#"
                                    className="btn btn-primary d-sm-none btn-icon"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modal-report"
                                    aria-label="Create new report"
                                >
                                    {/* Download SVG icon from http://tabler-icons.io/i/plus */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="icon"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <line x1={12} y1={5} x2={12} y2={19} />
                                        <line x1={5} y1={12} x2={19} y2={12} />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            <Modal title="Add New Customer" >

            </Modal>
                
            {/* Page body */}
            <div className="page-body">
                <div className="container-xl">
                    <div className="row row-deck row-cards">
                        <div className="col-sm-6 col-lg-3">
                            <div className="card">
                                <div className="card-body">

                                    <div className="d-flex align-items-center">
                                        <div className="subheader">Sales
                                            <a href="#" className="btn" data-bs-toggle="modal" data-bs-target="#modal-large">
                                                Large modal
                                            </a>
                                            
                                        </div>
                                        <div className="ms-auto lh-1">
                                            <div className="dropdown">
                                                <a
                                                    className="dropdown-toggle text-muted"
                                                    href="#"
                                                    data-bs-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    Last 7 days
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-end">
                                                    <a className="dropdown-item active" href="#">
                                                        Last 7 days
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Last 30 days
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Last 3 months
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h1 mb-3">75%</div>
                                    <div className="d-flex mb-2">
                                        <div>Conversion rate</div>
                                        <div className="ms-auto">
                                            <span className="text-green d-inline-flex align-items-center lh-1">
                                                7%{" "}
                                                {/* Download SVG icon from http://tabler-icons.io/i/trending-up */}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="icon ms-1"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <polyline points="3 17 9 11 13 15 21 7" />
                                                    <polyline points="14 7 21 7 21 14" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="progress progress-sm">
                                        <div
                                            className="progress-bar bg-primary"
                                            style={{ width: "75%" }}
                                            role="progressbar"
                                            aria-valuenow={75}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label="75% Complete"
                                        >
                                            <span className="visually-hidden">75% Complete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="subheader">Revenue</div>
                                        <div className="ms-auto lh-1">
                                            <div className="dropdown">
                                                <a
                                                    className="dropdown-toggle text-muted"
                                                    href="#"
                                                    data-bs-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    Last 7 days
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-end">
                                                    <a className="dropdown-item active" href="#">
                                                        Last 7 days
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Last 30 days
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Last 3 months
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-baseline">
                                        <div className="h1 mb-0 me-2">$4,300</div>
                                        <div className="me-auto">
                                            <span className="text-green d-inline-flex align-items-center lh-1">
                                                8%{" "}
                                                {/* Download SVG icon from http://tabler-icons.io/i/trending-up */}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="icon ms-1"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <polyline points="3 17 9 11 13 15 21 7" />
                                                    <polyline points="14 7 21 7 21 14" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div id="chart-revenue-bg" className="chart-sm" />
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="subheader">New clients</div>
                                        <div className="ms-auto lh-1">
                                            <div className="dropdown">
                                                <a
                                                    className="dropdown-toggle text-muted"
                                                    href="#"
                                                    data-bs-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    Last 7 days
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-end">
                                                    <a className="dropdown-item active" href="#">
                                                        Last 7 days
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Last 30 days
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Last 3 months
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-baseline">
                                        <div className="h1 mb-3 me-2">6,782</div>
                                        <div className="me-auto">
                                            <span className="text-yellow d-inline-flex align-items-center lh-1">
                                                0%{" "}
                                                {/* Download SVG icon from http://tabler-icons.io/i/minus */}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="icon ms-1"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <line x1={5} y1={12} x2={19} y2={12} />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div id="chart-new-clients" className="chart-sm" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="subheader">Active users</div>
                                        <div className="ms-auto lh-1">
                                            <div className="dropdown">
                                                <a
                                                    className="dropdown-toggle text-muted"
                                                    href="#"
                                                    data-bs-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    Last 7 days
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-end">
                                                    <a className="dropdown-item active" href="#">
                                                        Last 7 days
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Last 30 days
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Last 3 months
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-baseline">
                                        <div className="h1 mb-3 me-2">2,986</div>
                                        <div className="me-auto">
                                            <span className="text-green d-inline-flex align-items-center lh-1">
                                                4%{" "}
                                                {/* Download SVG icon from http://tabler-icons.io/i/trending-up */}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="icon ms-1"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <polyline points="3 17 9 11 13 15 21 7" />
                                                    <polyline points="14 7 21 7 21 14" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div id="chart-active-users" className="chart-sm" />
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row row-cards">
                                <div className="col-sm-6 col-lg-3">
                                    <div className="card card-sm">
                                        <div className="card-body">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <span className="bg-primary text-white avatar">
                                                        {/* Download SVG icon from http://tabler-icons.io/i/currency-dollar */}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="icon"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={2}
                                                            stroke="currentColor"
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                            <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
                                                            <path d="M12 3v3m0 12v3" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="col">
                                                    <div className="font-weight-medium">132 Sales</div>
                                                    <div className="text-muted">12 waiting payments</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <div className="card card-sm">
                                        <div className="card-body">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <span className="bg-green text-white avatar">
                                                        {/* Download SVG icon from http://tabler-icons.io/i/shopping-cart */}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="icon"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={2}
                                                            stroke="currentColor"
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                            <circle cx={6} cy={19} r={2} />
                                                            <circle cx={17} cy={19} r={2} />
                                                            <path d="M17 17h-11v-14h-2" />
                                                            <path d="M6 5l14 1l-1 7h-13" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="col">
                                                    <div className="font-weight-medium">78 Orders</div>
                                                    <div className="text-muted">32 shipped</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <div className="card card-sm">
                                        <div className="card-body">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <span className="bg-twitter text-white avatar">
                                                        {/* Download SVG icon from http://tabler-icons.io/i/brand-twitter */}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="icon"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={2}
                                                            stroke="currentColor"
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                            <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="col">
                                                    <div className="font-weight-medium">623 Shares</div>
                                                    <div className="text-muted">16 today</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <div className="card card-sm">
                                        <div className="card-body">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <span className="bg-facebook text-white avatar">
                                                        {/* Download SVG icon from http://tabler-icons.io/i/brand-facebook */}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="icon"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={2}
                                                            stroke="currentColor"
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                            <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="col">
                                                    <div className="font-weight-medium">132 Likes</div>
                                                    <div className="text-muted">21 today</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">Traffic summary</h3>
                                    <div id="chart-mentions" className="chart-lg" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">Locations</h3>
                                    <div className="ratio ratio-21x9">
                                        <div>
                                            <div id="map-world" className="w-100 h-100" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="mb-3">
                                                Using Storage <strong>6854.45 MB </strong>of 8 GB
                                            </p>
                                            <div className="progress progress-separated mb-3">
                                                <div
                                                    className="progress-bar bg-primary"
                                                    role="progressbar"
                                                    style={{ width: "44%" }}
                                                    aria-label="Regular"
                                                />
                                                <div
                                                    className="progress-bar bg-info"
                                                    role="progressbar"
                                                    style={{ width: "19%" }}
                                                    aria-label="System"
                                                />
                                                <div
                                                    className="progress-bar bg-success"
                                                    role="progressbar"
                                                    style={{ width: "9%" }}
                                                    aria-label="Shared"
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col-auto d-flex align-items-center pe-2">
                                                    <span className="legend me-2 bg-primary" />
                                                    <span>Regular</span>
                                                    <span className="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-muted">
                                                        915MB
                                                    </span>
                                                </div>
                                                <div className="col-auto d-flex align-items-center px-2">
                                                    <span className="legend me-2 bg-info" />
                                                    <span>System</span>
                                                    <span className="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-muted">
                                                        415MB
                                                    </span>
                                                </div>
                                                <div className="col-auto d-flex align-items-center px-2">
                                                    <span className="legend me-2 bg-success" />
                                                    <span>Shared</span>
                                                    <span className="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-muted">
                                                        201MB
                                                    </span>
                                                </div>
                                                <div className="col-auto d-flex align-items-center ps-2">
                                                    <span className="legend me-2" />
                                                    <span>Free</span>
                                                    <span className="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-muted">
                                                        612MB
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer footer-transparent d-print-none">
                <div className="container-xl">
                    <div className="row text-center align-items-center flex-row-reverse">
                        <div className="col-lg-auto ms-lg-auto">
                            <ul className="list-inline list-inline-dots mb-0">
                                <li className="list-inline-item">
                                    <a href="./docs/index.html" className="link-secondary">
                                        Documentation
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="./license.html" className="link-secondary">
                                        License
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a
                                        href="https://github.com/tabler/tabler"
                                        target="_blank"
                                        className="link-secondary"
                                        rel="noopener"
                                    >
                                        Source code
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a
                                        href="https://github.com/sponsors/codecalm"
                                        target="_blank"
                                        className="link-secondary"
                                        rel="noopener"
                                    >
                                        {/* Download SVG icon from http://tabler-icons.io/i/heart */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon text-pink icon-filled icon-inline"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                        </svg>
                                        Sponsor
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                            <ul className="list-inline list-inline-dots mb-0">
                                <li className="list-inline-item">
                                    Copyright © 2022
                                    <a href="." className="link-secondary">
                                        Tabler
                                    </a>
                                    . All rights reserved.
                                </li>
                                <li className="list-inline-item">
                                    <a
                                        href="./changelog.html"
                                        className="link-secondary"
                                        rel="noopener"
                                    >
                                        v1.0.0-beta12
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
      loginData: state.LoginDetails,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      setOnLoginDetails: (p) => {
        dispatch(setLoginDetails(p));
      },
      setOnBranchList: (p) => {
        dispatch(setBranchList(p));
      }
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(DashBoards);
