import React from "react";
import { Link } from "react-router-dom";

const NaviagtionTab = (props) => {
  return (
    <div className="navbar-expand-md">
      <div className="collapse navbar-collapse" id="navbar-menu">
        <div className="navbar navbar-light">
          <div className="container-xl">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="./index.html">
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
                    {/* Download SVG icon from http://tabler-icons.io/i/home */}
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
                      <polyline points="5 12 3 12 12 3 21 12 19 12" />
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                    </svg>
                  </span>
                  <span className="nav-link-title">Home</span>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#navbar-base"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  role="button"
                  aria-expanded="false"
                >
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
                    {/* Download SVG icon from http://tabler-icons.io/i/package */}
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
                      <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
                      <line x1={12} y1={12} x2={20} y2="7.5" />
                      <line x1={12} y1={12} x2={12} y2={21} />
                      <line x1={12} y1={12} x2={4} y2="7.5" />
                      <line x1={16} y1="5.25" x2={8} y2="9.75" />
                    </svg>
                  </span>
                  <span className="nav-link-title">KYC</span>
                </a>
                <div className="dropdown-menu">
                  <div className="dropdown-menu-columns">
                    <div className="dropdown-menu-column">
                      <a className="dropdown-item" href="./empty.html">
                        Empty page
                      </a>

                      <div className="dropend">
                        <a
                          className="dropdown-item dropdown-toggle"
                          href="#sidebar-cards"
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="outside"
                          role="button"
                          aria-expanded="false"
                        >
                          Cards
                          <span className="badge badge-sm bg-green text-uppercase ms-2">
                            New
                          </span>
                        </a>
                        <div className="dropdown-menu">
                          <a href="./cards.html" className="dropdown-item">
                            Sample cards
                          </a>
                          <a href="./card-actions.html" className="dropdown-item">
                            Card actions
                            <span className="badge badge-sm bg-green text-uppercase ms-2">
                              New
                            </span>
                          </a>
                          <a
                            href="./cards-masonry.html"
                            className="dropdown-item"
                          >
                            Cards Masonry
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li className="nav-item dropdown">
              <a
                  className="nav-link dropdown-toggle"
                  href="#navbar-extra"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  role="button"
                  aria-expanded="false"
                >
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
                    {/* Download SVG icon from http://tabler-icons.io/i/star */}
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
                      <polyline points="9 11 12 14 20 6" />
                      <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                    </svg>
                  </span>
                  <span className="nav-link-title">Transactions</span>
                </a>
                <div className="dropdown-menu">
                  <div className="dropdown-menu-columns">
                    <div className="dropdown-menu-column">
                      <a
                        className="dropdown-item"
                        href="./layout-horizontal.html"
                      >
                        Horizontal
                      </a>
                    </div>
                  </div>
                </div>
              </li>
             

              <li className="nav-item dropdown">
              <a
                  className="nav-link dropdown-toggle"
                  href="#navbar-extra"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  role="button"
                  aria-expanded="false"
                >
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
                    {/* Download SVG icon from http://tabler-icons.io/i/star */}
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
                      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                    </svg>
                  </span>
                  <span className="nav-link-title">Transactions</span>
                </a>
                <div className="dropdown-menu">
                  <div className="dropdown-menu-columns">
                    <div className="dropdown-menu-column">
                      <a
                        className="dropdown-item"
                        href="./layout-horizontal.html"
                      >
                        Horizontal
                      </a>
                    </div>
                  </div>
                </div>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#navbar-layout"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  role="button"
                  aria-expanded="false"
                >
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
                    {/* Download SVG icon from http://tabler-icons.io/i/layout-2 */}
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
                      <rect x={4} y={4} width={6} height={5} rx={2} />
                      <rect x={4} y={13} width={6} height={7} rx={2} />
                      <rect x={14} y={4} width={6} height={7} rx={2} />
                      <rect x={14} y={15} width={6} height={5} rx={2} />
                    </svg>
                  </span>
                  <span className="nav-link-title">Loan</span>
                </a>
                <div className="dropdown-menu">
                  <div className="dropdown-menu-columns">
                    <div className="dropdown-menu-column">
                      <a
                        className="dropdown-item"
                        href="./layout-horizontal.html"
                      >
                        Horizontal
                      </a>
                    </div>
                  </div>
                </div>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#navbar-help"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  role="button"
                  aria-expanded="false"
                >
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
                    {/* Download SVG icon from http://tabler-icons.io/i/lifebuoy */}
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
                      <circle cx={12} cy={12} r={9} />
                      <line x1={15} y1={15} x2="18.35" y2="18.35" />
                      <line x1={9} y1={15} x2="5.65" y2="18.35" />
                      <line x1="5.65" y1="5.65" x2={9} y2={9} />
                      <line x1="18.35" y1="5.65" x2={15} y2={9} />
                    </svg>
                  </span>
                  <span className="nav-link-title">Staff</span>
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="./docs/index.html">
                    Documentation
                  </a>
                  <a className="dropdown-item" href="./changelog.html">
                    Site Map
                  </a>
                  <a
                    className="dropdown-item"
                    href="https://github.com/tabler/tabler"
                    target="_blank"
                    rel="noopener"
                  >
                    Source code
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#navbar-help"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  role="button"
                  aria-expanded="false"
                >
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
                    {/* Download SVG icon from http://tabler-icons.io/i/lifebuoy */}
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
                      <circle cx={12} cy={12} r={9} />
                      <line x1={15} y1={15} x2="18.35" y2="18.35" />
                      <line x1={9} y1={15} x2="5.65" y2="18.35" />
                      <line x1="5.65" y1="5.65" x2={9} y2={9} />
                      <line x1="18.35" y1="5.65" x2={15} y2={9} />
                    </svg>
                  </span>
                  <span className="nav-link-title">Settings</span>
                </a>
                <div className="dropdown-menu">
                  <Link to='/branch' className="dropdown-item" >Branch</Link>
                  <Link to='/department' className="dropdown-item" >Departments</Link>
                  <Link to='/loan-types' className="dropdown-item" >Loan Types</Link>
                  <Link to='/roles' className="dropdown-item" >Roles</Link>
                 
                </div>
              </li>
            </ul>
            <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
              <form action="./" method="get" autoComplete="off" noValidate="">
                <div className="input-icon">
                  <span className="input-icon-addon">
                    {/* Download SVG icon from http://tabler-icons.io/i/search */}
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
                      <circle cx={10} cy={10} r={7} />
                      <line x1={21} y1={21} x2={15} y2={15} />
                    </svg>
                  </span>
                  <input
                    type="text"
                    defaultValue=""
                    className="form-control"
                    placeholder="Search…"
                    aria-label="Search in website"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default NaviagtionTab;