import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { connect } from "react-redux";
import {
  setBranchList,
  setLoginDetails,
  setDepartmentList,
  setDesignationList,
  setLoanTypes,
} from "../../action/action";
import {
  FormatBarChart,
  FormatHorizontalBar,
  FormatLineGraph,
  FormatPieChart,
} from "../../constants/chart-data";
import { currencyConverter, formatDate } from "../../constants/constants";
import { serverLink } from "../../constants/url";
import { Footer } from "../common/footer";
import Loader from "../common/loader";
import Modal from "../common/modal/modal";
import SuccessModal from "../common/modal/successmodal";
// import {SuccessModal} from "../common/modal/successmodal";
const DashBoards = (props) => {
  const token = props.loginData[0].token;
  const [isLoading, setIsLoading] = useState(true);
  const [TotalAccounts, setTotalAccounts] = useState([]);
  const [TotalBalance, setTotalBalance] = useState([]);
  const [TotalDebit, setTotalDebit] = useState([]);
  const [TotalCredit, setTotalCredit] = useState([]);
  const [TotalLoans, setTotalLoans] = useState([]);
  const [WeeklyTrasactionsData, setWeeklyTrasactionData] = useState([]);
  const [TChart, setTChart] = useState([]);
  const [barChart, setBarChart] = useState("");
  const [LoanPieChart, setLoanPieChart] = useState("");
  const [LoanBarChart, setLoanBarChart] = useState("");
  const [LoanPayBack, setLoanPayBack] = useState("");
  const [PayBack, setPayBack] = useState([]);
  const [TodaysCustomers, setTodaysCustomers] = useState([]);
  const [TodaysLoans, setTodaysLoans] = useState([]);

  useEffect(() => {
    getBranches();
  }, []);

  const getBranches = async () => {
    await axios
      .get(`${serverLink}settings/department/list`, token)
      .then((res) => {
        if (res.data.length > 0) {
          props.setOnDepartmentList(res.data);
        }
      });
    await axios
      .get(`${serverLink}settings/designation/list`, token)
      .then((res) => {
        if (res.data.length > 0) {
          props.setOnDesignationList(res.data);
        }
      });

    await axios.get(`${serverLink}settings/branch/list`, token).then((res) => {
      props.setOnBranchList(res.data);
    });

    await axios
      .get(`${serverLink}settings/loan_types/list`, token)
      .then((res) => {
        props.setOnLoanTypesList(res.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  };

  const getData = async () => {
    try {
      await axios.get(`${serverLink}dashboard/overview`, token).then((res) => {
        if (res.data.length > 0) {
          setTotalAccounts(res.data[0]?.TotalAccounts);
          setTotalBalance(res.data[0]?.TotalBalance);
          setTotalDebit(res.data[0]?.TotalDebit);
          setTotalCredit(res.data[0]?.TotalCredit);
          setTotalLoans(res.data[0]?.TotalLoans);
          setWeeklyTrasactionData(res.data[0]?.WeeklyTrasactionsData);
          setPayBack(res.data[0]?.PayBack);
        }
      });

      await axios
        .get(`${serverLink}dashboard/charts/transactions`, token)
        .then((res) => {
          if (res.data.length > 0) {
            const debits = res.data
              .filter((x) => x.TransactionType === "Debit")
              .map((j) => j.Amount);
            const credits = res.data
              .filter((x) => x.TransactionType === "Credit")
              .map((j) => j.Amount);
            const transfers = res.data
              .filter((x) => x.TransactionType === "Transfer")
              .map((j) => j.Amount);
            const months = [...new Set(res.data.map((x) => x.Month))];
            const series = FormatBarChart(
              { title: "Debits", data: debits },
              { title: "Credits", data: credits },
              { title: "Transfers", data: transfers },
              months
            );
            setBarChart(series);
          }
        });

      await axios
        .get(`${serverLink}dashboard/charts/loans`, token)
        .then((res) => {
          if (res.data.length > 0) {
            const labels = res.data.map((x) => x.label);
            const values = res.data.map((x) => x.value);
            const amount = res.data.map((x) =>
              x.amount !== null ? x.amount : 0
            );
            const series = FormatPieChart(labels, values);

            const barseries = FormatHorizontalBar(labels, amount);
            setLoanBarChart(barseries);
            setLoanPieChart(series);
          }
        });

      await axios
        .get(`${serverLink}dashboard/charts/active-loan`, token)
        .then((res) => {
          if (res.data.length > 0) {
            const amount = res.data.map((x) => parseFloat(x.AmountPaid));
            const date = res.data.map((x) => formatDate(x.InsertedDate));
            const series = FormatLineGraph(date, amount);
            setLoanPayBack(series);
          }
        });
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
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

      <div className="page-body">
        <div className="container-xl">
          <div className="row row-deck row-cards">
            <div className="col-sm-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="subheader">
                      <h3>Total Balance</h3>
                    </div>
                  </div>
                  <div className="h1 mb-3 mt-3" style={{ fontSize: "40px" }}>
                    {TotalBalance.length > 0
                      ? currencyConverter(TotalBalance[0]?.AccountBalance)
                      : 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="subheader">
                      <h3>Total Accounts</h3>
                    </div>
                  </div>
                  <div className="h1 mb-3 mt-3" style={{ fontSize: "40px" }}>
                    {TotalAccounts.length > 0 ? TotalAccounts[0].Accounts : 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="subheader">
                      <h3>Debit Transactions</h3>
                    </div>
                  </div>
                  <div className="h1 mb-3 mt-3" style={{ fontSize: "40px" }}>
                    {TotalDebit.length > 0 ? TotalDebit[0].TotalDebit : 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="subheader">
                      <h3>Credit Transactions</h3>
                    </div>
                  </div>
                  <div className="h1 mb-3 mt-3" style={{ fontSize: "40px" }}>
                    {TotalCredit.length > 0 ? TotalCredit[0].TotalCredit : 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row row-cards">
                <div className="col-sm-6 col-lg-6">
                  <div className="card card-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="bg-primary text-white avatar">
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
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
                              <path d="M12 3v3m0 12v3" />
                            </svg>
                          </span>
                        </div>
                        <div className="col">
                          <div
                            className="font-weight-medium"
                            style={{ fontWeight: "bolder" }}
                          >
                            {TotalLoans.length > 0
                              ? TotalLoans[0].TotalLoans
                              : 0}
                          </div>
                          <div className="text-muted">Total Loan Records</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-6">
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
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <circle cx={6} cy={19} r={2} />
                              <circle cx={17} cy={19} r={2} />
                              <path d="M17 17h-11v-14h-2" />
                              <path d="M6 5l14 1l-1 7h-13" />
                            </svg>
                          </span>
                        </div>
                        <div className="col">
                          <div
                            className="font-weight-medium"
                            style={{ fontWeight: "bolder" }}
                          >
                            {PayBack.length > 0 ? PayBack[0].PayBack : 0}
                          </div>
                          <div className="text-muted">
                            Total PayBack Records
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  {barChart !== "" && (
                    <div>
                      <h3>Customer Transaction Volume</h3>
                      <ReactApexChart
                        options={barChart.options}
                        series={barChart.series}
                        type="bar"
                        height={350}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h3>Customer Loan Records</h3>
                  {LoanPieChart !== "" && (
                    <ReactApexChart
                      options={LoanPieChart.options}
                      series={LoanPieChart.series}
                      type="donut"
                      height={350}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h3>Customer Loan Volume</h3>
                  {LoanBarChart !== "" && (
                    <ReactApexChart
                      options={LoanBarChart.options}
                      series={LoanBarChart.series}
                      type="bar"
                      height={350}
                    />
                  )}
                </div>
              </div>
            </div>

            {LoanPayBack !== "" && (
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h3>Current Loan PayBack</h3>
                    <ReactApexChart
                      options={LoanPayBack.options}
                      series={LoanPayBack.series}
                      type="line"
                      height={350}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
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
    },
    setOnDepartmentList: (p) => {
      dispatch(setDepartmentList(p));
    },
    setOnDesignationList: (p) => {
      dispatch(setDesignationList(p));
    },
    setOnLoanTypesList: (p) => {
      dispatch(setLoanTypes(p));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoards);
