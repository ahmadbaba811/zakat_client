import React from "react";

const NavBar=()=>{
    return(
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
                    <span className="nav-link-title">Interface</span>
                  </a>
                  <div className="dropdown-menu">
                    <div className="dropdown-menu-columns">
                      <div className="dropdown-menu-column">
                        <a className="dropdown-item" href="./empty.html">
                          Empty page
                        </a>
                        <a className="dropdown-item" href="./accordion.html">
                          Accordion
                        </a>
                        <a className="dropdown-item" href="./blank.html">
                          Blank page
                        </a>
                        <a className="dropdown-item" href="./buttons.html">
                          Buttons
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
                        <a className="dropdown-item" href="./colors.html">
                          Colors
                        </a>
                        <a className="dropdown-item" href="./datagrid.html">
                          Data grid
                          <span className="badge badge-sm bg-green text-uppercase ms-2">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./datatables.html">
                          Datatables
                          <span className="badge badge-sm bg-green text-uppercase ms-2">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./dropdowns.html">
                          Dropdowns
                        </a>
                        <a className="dropdown-item" href="./modals.html">
                          Modals
                        </a>
                        <a className="dropdown-item" href="./maps.html">
                          Maps
                        </a>
                        <a className="dropdown-item" href="./map-fullsize.html">
                          Map fullsize
                        </a>
                        <a className="dropdown-item" href="./maps-vector.html">
                          Vector maps
                          <span className="badge badge-sm bg-green text-uppercase ms-2">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./navigation.html">
                          Navigation
                        </a>
                        <a className="dropdown-item" href="./charts.html">
                          Charts
                        </a>
                      </div>
                      <div className="dropdown-menu-column">
                        <a className="dropdown-item" href="./pagination.html">
                          {/* Download SVG icon from http://tabler-icons.io/i/pie-chart */}
                          Pagination
                        </a>
                        <a className="dropdown-item" href="./placeholder.html">
                          Placeholder
                        </a>
                        <a className="dropdown-item" href="./tabs.html">
                          Tabs
                        </a>
                        <a className="dropdown-item" href="./tables.html">
                          Tables
                        </a>
                        <a className="dropdown-item" href="./carousel.html">
                          Carousel
                          <span className="badge badge-sm bg-green text-uppercase ms-2">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./lists.html">
                          Lists
                        </a>
                        <a className="dropdown-item" href="./typography.html">
                          Typography
                        </a>
                        <a className="dropdown-item" href="./offcanvas.html">
                          Offcanvas
                        </a>
                        <a className="dropdown-item" href="./markdown.html">
                          Markdown
                        </a>
                        <a className="dropdown-item" href="./dropzone.html">
                          Dropzone
                          <span className="badge badge-sm bg-green text-uppercase ms-2">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./lightbox.html">
                          Lightbox
                          <span className="badge badge-sm bg-green text-uppercase ms-2">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./tinymce.html">
                          TinyMCE
                          <span className="badge badge-sm bg-green text-uppercase ms-2">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./inline-player.html">
                          Inline player
                          <span className="badge badge-sm bg-green text-uppercase ms-2">
                            New
                          </span>
                        </a>
                        <div className="dropend">
                          <a
                            className="dropdown-item dropdown-toggle"
                            href="#sidebar-authentication"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                            role="button"
                            aria-expanded="false"
                          >
                            Authentication
                          </a>
                          <div className="dropdown-menu">
                            <a href="./sign-in.html" className="dropdown-item">
                              Sign in
                            </a>
                            <a
                              href="./sign-in-illustration.html"
                              className="dropdown-item"
                            >
                              Sign in with illustration
                            </a>
                            <a
                              href="./sign-in-cover.html"
                              className="dropdown-item"
                            >
                              Sign in with cover
                            </a>
                            <a href="./sign-up.html" className="dropdown-item">
                              Sign up
                            </a>
                            <a
                              href="./forgot-password.html"
                              className="dropdown-item"
                            >
                              Forgot password
                            </a>
                            <a
                              href="./terms-of-service.html"
                              className="dropdown-item"
                            >
                              Terms of service
                            </a>
                            <a href="./auth-lock.html" className="dropdown-item">
                              Lock screen
                            </a>
                          </div>
                        </div>
                        <div className="dropend">
                          <a
                            className="dropdown-item dropdown-toggle"
                            href="#sidebar-error"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                            role="button"
                            aria-expanded="false"
                          >
                            {/* Download SVG icon from http://tabler-icons.io/i/file-minus */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-inline me-1"
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
                              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                              <line x1={9} y1={14} x2={15} y2={14} />
                            </svg>
                            Error pages
                          </a>
                          <div className="dropdown-menu">
                            <a href="./error-404.html" className="dropdown-item">
                              404 page
                            </a>
                            <a href="./error-500.html" className="dropdown-item">
                              500 page
                            </a>
                            <a
                              href="./error-maintenance.html"
                              className="dropdown-item"
                            >
                              Maintenance page
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./form-elements.html">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/checkbox */}
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
                    <span className="nav-link-title">Form elements</span>
                  </a>
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
                    <span className="nav-link-title">Extra</span>
                  </a>
                  <div className="dropdown-menu">
                    <div className="dropdown-menu-columns">
                      <div className="dropdown-menu-column">
                        <a className="dropdown-item" href="./activity.html">
                          Activity
                        </a>
                        <a className="dropdown-item" href="./gallery.html">
                          Gallery
                        </a>
                        <a className="dropdown-item" href="./invoice.html">
                          Invoice
                        </a>
                        <a className="dropdown-item" href="./search-results.html">
                          Search results
                        </a>
                        <a className="dropdown-item" href="./pricing.html">
                          Pricing cards
                        </a>
                        <a className="dropdown-item" href="./pricing-table.html">
                          Pricing table
                        </a>
                        <a className="dropdown-item" href="./faq.html">
                          FAQ
                          <span className="badge badge-sm bg-green text-uppercase ms-2">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./users.html">
                          Users
                        </a>
                        <a className="dropdown-item" href="./license.html">
                          License
                        </a>
                      </div>
                      <div className="dropdown-menu-column">
                        <a className="dropdown-item" href="./logs.html">
                          Logs
                          <span className="badge badge-sm bg-green text-uppercase ms-2">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./music.html">
                          Music
                        </a>
                        <a className="dropdown-item" href="./tasks.html">
                          Tasks
                          <span className="badge badge-sm bg-green text-uppercase ms-2">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./uptime.html">
                          Uptime monitor
                        </a>
                        <a className="dropdown-item" href="./widgets.html">
                          Widgets
                        </a>
                        <a className="dropdown-item" href="./wizard.html">
                          Wizard
                        </a>
                        <a className="dropdown-item" href="./settings.html">
                          Settings
                          <span className="badge badge-sm bg-green text-uppercase ms-2">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./job-listing.html">
                          Job listing
                          <span className="badge badge-sm bg-green text-uppercase ms-2">
                            New
                          </span>
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
                    <span className="nav-link-title">Layout</span>
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
                        <a className="dropdown-item" href="./layout-boxed.html">
                          Boxed
                          <span className="badge badge-sm bg-green text-uppercase ms-2">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./layout-vertical.html">
                          Vertical
                        </a>
                        <a
                          className="dropdown-item"
                          href="./layout-vertical-transparent.html"
                        >
                          Vertical transparent
                        </a>
                        <a
                          className="dropdown-item"
                          href="./layout-vertical-right.html"
                        >
                          Right vertical
                        </a>
                        <a className="dropdown-item" href="./layout-condensed.html">
                          Condensed
                        </a>
                        <a className="dropdown-item" href="./layout-combo.html">
                          Combined
                        </a>
                      </div>
                      <div className="dropdown-menu-column">
                        <a
                          className="dropdown-item"
                          href="./layout-navbar-dark.html"
                        >
                          Navbar dark
                        </a>
                        <a
                          className="dropdown-item"
                          href="./layout-navbar-sticky.html"
                        >
                          Navbar sticky
                        </a>
                        <a
                          className="dropdown-item"
                          href="./layout-navbar-overlap.html"
                        >
                          Navbar overlap
                        </a>
                        <a className="dropdown-item" href="./layout-rtl.html">
                          RTL mode
                        </a>
                        <a className="dropdown-item" href="./layout-fluid.html">
                          Fluid
                        </a>
                        <a
                          className="dropdown-item"
                          href="./layout-fluid-vertical.html"
                        >
                          Fluid vertical
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./icons.html">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/ghost */}
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
                        <path d="M5 11a7 7 0 0 1 14 0v7a1.78 1.78 0 0 1 -3.1 1.4a1.65 1.65 0 0 0 -2.6 0a1.65 1.65 0 0 1 -2.6 0a1.65 1.65 0 0 0 -2.6 0a1.78 1.78 0 0 1 -3.1 -1.4v-7" />
                        <line x1={10} y1={10} x2="10.01" y2={10} />
                        <line x1={14} y1={10} x2="14.01" y2={10} />
                        <path d="M10 14a3.5 3.5 0 0 0 4 0" />
                      </svg>
                    </span>
                    <span className="nav-link-title">2681 icons</span>
                  </a>
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
                    <span className="nav-link-title">Help</span>
                  </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="./docs/index.html">
                      Documentation
                    </a>
                    <a className="dropdown-item" href="./changelog.html">
                      Changelog
                    </a>
                    <a
                      className="dropdown-item"
                      href="https://github.com/tabler/tabler"
                      target="_blank"
                      rel="noopener"
                    >
                      Source code
                    </a>
                    <a
                      className="dropdown-item text-pink"
                      href="https://github.com/sponsors/codecalm"
                      target="_blank"
                      rel="noopener"
                    >
                      {/* Download SVG icon from http://tabler-icons.io/i/heart */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-inline me-1"
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
                      Sponsor project!
                    </a>
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

export default NavBar;