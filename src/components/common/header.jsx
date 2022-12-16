import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setLoginDetails } from "../../action/action";
import Logo from '../../images/zakat.jpg'
import { serverLink } from "../../constants/url";
import BranchSVG from './arrows-split.svg'
import { useState } from "react";
import axios from "axios";
import { formatDateAndTime } from "../../constants/constants";

const Header = (props) => {
  const login = props.loginData;
  const token = props.loginData[0].token

  const [Notifications, setNotifications] = useState([]);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  const getData = async () => {
    await axios.get(`${serverLink}dashboard/notification`, token).then((res) => {
      if (res.data.length > 0) {
        let Customer = res.data[0].Customers.map(x => ({ title: 'New Customer', message: `Customer ${x.CustomerID + " added by " + x.InsertedBy}`, date: x.TDate }));
        let Loans = res.data[0].Loans.map(x => ({ title: 'New Loan', message: `Loan ${x.ID + " for customer " + x.CustomerID + " added by " + x.InsertedBy}`, date: x.TDate }));
        const t = [...Customer, ...Loans]
        setNotifications(t);
      }
    })
  }

  useEffect(() => {
    getData();
  }, [])

  const Logout = () => {
    props.setOnLoginDetails([])
  }

  return (
    <header id="head" className={`navbar navbar-expand-md navbar-light d-print-none`}>
      <div className="container-xl">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-menu"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <a href="/" style={{ textDecoration: 'none' }} className="text text-black-50">
            <img
              src={Logo}
              width={110}
              height={32}
              alt="Tabler"
              className="navbar-brand-image"
            />
            <span>{" "}Zakat Initiative</span>
          </a>
        </h1>
        <div className="navbar-nav flex-row order-md-last">
          <div className="nav-item d-none d-md-flex me-3">
            <div className="btn-list">
              <div className="mb-3">
                <select type="text" className="form-control" disabled={login[0]?.Role !== "Admin" ? true : false} value={login[0]?.Branch}>
                  {
                    props.branch_list.length > 0 &&
                    props.branch_list.map((x, y) => {
                      return (
                        <option key={y} value={x.BranchCode}  >{x.BranchName}</option>
                      )
                    })
                  }

                </select>
              </div>
              {/* <a
                href="https://github.com/tabler/tabler"
                className="btn"
                target="_blank"
                rel="noreferrer"
                title="Branch"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logic-and" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M22 12h-5" />
                  <path d="M2 9h5" />
                  <path d="M2 15h5" />
                  <path d="M9 5c6 0 8 3.5 8 7s-2 7 -8 7h-2v-14h2z" />
                </svg>
                {
                  props.branch_list.length > 0 ?
                    props.branch_list.filter(x => x.BranchCode === props.loginData[0].Branch)[0].BranchName :
                    props.loginData[0].Branch
                }
              </a> */}
              <a
                href="#"
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-world-www" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19.5 7a8.998 8.998 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4" />
                  <path d="M11.5 3a16.989 16.989 0 0 0 -1.826 4" />
                  <path d="M12.5 3a16.989 16.989 0 0 1 1.828 4.004" />
                  <path d="M19.5 17a8.998 8.998 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4" />
                  <path d="M11.5 21a16.989 16.989 0 0 1 -1.826 -4" />
                  <path d="M12.5 21a16.989 16.989 0 0 0 1.828 -4.004" />
                  <path d="M2 10l1 4l1.5 -4l1.5 4l1 -4" />
                  <path d="M17 10l1 4l1.5 -4l1.5 4l1 -4" />
                  <path d="M9.5 10l1 4l1.5 -4l1.5 4l1 -4" />
                </svg>
                Website
              </a>
            </div>
          </div>


          <div className="d-none d-md-flex">
            {
              window.localStorage.getItem("tablerTheme") === "light" ?
                <a
                  onClick={() => {
                    window.localStorage.setItem("tablerTheme", "dark")
                  }}
                  href=""
                  className="nav-link px-0 hide-theme-dark"
                  title="Enable dark mode"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                >
                  {/* Download SVG icon from http://tabler-icons.io/i/moon */}
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
                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                  </svg>
                </a>
                :
                <a
                  onClick={() => {
                    window.localStorage.setItem("tablerTheme", "light")
                  }}
                  href=""
                  className="nav-link px-0 hide-theme-light"
                  title="Enable light mode"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                >
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
                    <circle cx={12} cy={12} r={4} />
                    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                  </svg>
                </a>
            }



            <div className="nav-item dropdown d-none d-md-flex me-3">
              <a
                href="#"
                className="nav-link px-0"
                data-bs-toggle="dropdown"
                tabIndex={-1}
                aria-label="Show notifications"
              >
                {/* Download SVG icon from http://tabler-icons.io/i/bell */}
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
                  <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                  <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                </svg>
                <span className="badge bg-red" />
              </a>
              <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Last updates</h3>
                  </div>
                  <div className="list-group list-group-flush list-group-hoverable">

                    {
                      Notifications.length > 0 &&
                      Notifications.map((x, i) => {
                        return (
                          <div className="list-group-item">
                            <div className="row align-items-center">
                              <div className="col-md-2">
                                <span className="status-dot status-dot-animated bg-red d-block" />
                              </div>
                              <div className="col-md-10">
                                <a href="#" className="text-body d-block">
                                  {x.title}
                                </a>
                                <div className="d-block text-muted text-truncate mt-n1">
                                  {x.message}
                                </div>
                                <div className="col-md-12 text-dark fw-bold">
                                <span >
                                  {formatDateAndTime(x.date, "date_and_time")}
                                </span>
                              </div>
                              </div>
                              
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link d-flex lh-1 text-reset p-0"
              data-bs-toggle="dropdown"
              aria-label="Open user menu"
            >
              <span
                className="avatar avatar-sm"
                style={{ backgroundImage: props.loginData[0].ImagePath === "" ? `url(${Logo})` : `url(${`${serverLink}public/uploads/staff/${props.loginData[0].ImagePath}`})` }}
              />
              <div className="d-none d-xl-block ps-2">
                <div>{props.loginData[0].FirstName + " " + props.loginData[0].MiddleName + " " + props.loginData[0].Surname}</div>
                <div className="mt-1 small text-muted">
                  {
                    props.designation_list.length > 0 &&
                    props.designation_list.filter(x => x.DesignationCode === props.loginData[0].Designation)[0].DesignationName
                  }
                </div>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">

              <Link to={`/manage-staff?st=${props.loginData[0].StaffID}`} className="dropdown-item">
                Profile
              </Link>
              <div className="dropdown-divider" />
              <Link to={`/staff-report/${props.loginData[0].StaffID}`} className="dropdown-item">
                Settings
              </Link>
              <span onClick={Logout} className="dropdown-item cursor-pointer">
                Logout
              </span>
            </div>
          </div>
        </div>

      </div>
    </header>
  )
}

const mapStateToProps = (state) => {
  return {
    loginData: state.LoginDetails,
    designation_list: state.designation_list,
    branch_list: state.branch_list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOnLoginDetails: (p) => {
      dispatch(setLoginDetails(p));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
