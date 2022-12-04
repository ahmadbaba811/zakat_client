import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { currencyConverter, formatDate } from "../../../constants/constants";
import { serverLink } from "../../../constants/url";
import Chart from 'react-apexcharts'
import { FormatBarChart, FormatHorizontalBar, FormatLineGraph, FormatPieChart } from "../../../constants/chart-data";
import ReactApexChart from "react-apexcharts";


const CustomerOverview = (props) => {
    const token = props.loginData[0].token;
    const [TotalAccounts, setTotalAccounts] = useState([]);
    const [TotalBalance, setTotalBalance] = useState([]);
    const [TotalDebit, setTotalDebit] = useState([]);
    const [TotalCredit, setTotalCredit] = useState([]);
    const [TotalLoans, setTotalLoans] = useState([]);
    const [WeeklyTrasactionsData, setWeeklyTrasactionData] = useState([]);
    const [TChart, setTChart] = useState([])
    const [barChart, setBarChart] = useState("");
    const [LoanPieChart, setLoanPieChart] = useState("")
    const [LoanBarChart, setLoanBarChart] = useState("")
    const [LoanPayBack, setLoanPayBack] = useState("")

    const getData = async () => {
        try {
            await axios.get(`${serverLink}customer/overview/${props.customer[0]?.CustomerID}`, token).then((res) => {
                if (res.data.length > 0) {
                    setTotalAccounts(res.data[0]?.TotalAccounts);
                    setTotalBalance(res.data[0]?.TotalBalance);
                    setTotalDebit(res.data[0]?.TotalDebit);
                    setTotalCredit(res.data[0]?.TotalCredit);
                    setTotalLoans(res.data[0]?.TotalLoans);
                    setWeeklyTrasactionData(res.data[0]?.WeeklyTrasactionsData)
                }
            })

            await axios.get(`${serverLink}customer/charts/transactions/${props.customer[0]?.CustomerID}`, token).then((res) => {
                if (res.data.length > 0) {
                    const debits = res.data.filter(x => x.TransactionType === "Debit").map(j => j.Amount);
                    const credits = res.data.filter(x => x.TransactionType === "Credit").map(j => j.Amount);
                    const transfers = res.data.filter(x => x.TransactionType === "Transfer").map(j => j.Amount);
                    const months = [... new Set(res.data.map(x => x.Month))]
                    const series = FormatBarChart(
                        { title: 'Debits', data: debits },
                        { title: 'Credits', data: credits },
                        { title: 'Transfers', data: transfers },
                        months)
                    setBarChart(series)
                }
            })

            await axios.get(`${serverLink}customer/charts/loans/${props.customer[0]?.CustomerID}`, token).then((res) => {
                if (res.data.length > 0) {
                    const labels = res.data.map(x => x.label)
                    const values = res.data.map(x => x.value);
                    const amount = res.data.map(x => x.amount !== null ? x.amount : 0)
                    const series = FormatPieChart(labels, values);

                    const barseries = FormatHorizontalBar(labels, amount)
                    setLoanBarChart(barseries)
                    setLoanPieChart(series);

                }
            })

            await axios.get(`${serverLink}customer/charts/active-loan/${props.customer[0]?.CustomerID}`, token).then((res) => {
                if (res.data.length > 0) {
                    const amount = res.data.map(x => parseFloat(x.AmountPaid));
                    const date = res.data.map(x => formatDate(x.InsertedDate));
                    const series = FormatLineGraph(date, amount);
                    setLoanPayBack(series)


                }
            })
        } catch (e) {

        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (

        <div className="row col-md-12">
            <div className="col-md-3">
                <div className="card card-sm">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <span className="bg-green text-white avatar">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx={6} cy={19} r={2} /><circle cx={17} cy={19} r={2} /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                                </span>
                            </div>
                            <div className="col">
                                <div className="h1">
                                    {TotalBalance.length > 0 ? currencyConverter(TotalBalance[0].AccountBalance) : 0}
                                </div>
                                <div className="text-muted">
                                    Total Balance
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-9">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card card-sm">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <span className="bg-green text-white avatar">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx={6} cy={19} r={2} /><circle cx={17} cy={19} r={2} /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="h1">
                                            {TotalAccounts.length > 0 ? TotalAccounts[0].Accounts : 0}
                                        </div>
                                        <div className="text-muted">
                                            Accounts
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card card-sm">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <span className="bg-green text-white avatar">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx={6} cy={19} r={2} /><circle cx={17} cy={19} r={2} /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="h1">
                                            {TotalDebit.length > 0 ? TotalDebit[0].TotalDebit : 0}
                                        </div>
                                        <div className="text-muted">
                                            Debit Transactions
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card card-sm">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <span className="bg-green text-white avatar">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx={6} cy={19} r={2} /><circle cx={17} cy={19} r={2} /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="h1">
                                            {TotalCredit.length > 0 ? TotalCredit[0].TotalCredit : 0}
                                        </div>
                                        <div className="text-muted">
                                            Credit Transactions
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card card-sm">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <span className="bg-green text-white avatar">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx={6} cy={19} r={2} /><circle cx={17} cy={19} r={2} /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="h1">
                                            {TotalLoans.length > 0 ? TotalLoans[0].TotalLoans : 0}
                                        </div>
                                        <div className="text-muted">
                                            Total Loan Records
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


            <div className="col-12 col-md-6 col-lg">
                <div className="mb-4 mt-5">
                    <div className="row row-cards">
                        <div className="col-12">
                            <div className="card card-sm">
                                <div className="card-body">
                                    <h3 className="card-title">Analytics</h3>
                                    {
                                        barChart !== "" &&

                                        <div>
                                            <h3>Customer Transaction Volume</h3>
                                            <ReactApexChart
                                                options={barChart.options}
                                                series={barChart.series}
                                                type="bar"
                                                height={350}
                                            />
                                        </div>

                                    }
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h3>Customer Loan Records</h3>
                                            {
                                                LoanPieChart !== "" &&
                                                <ReactApexChart
                                                    options={LoanPieChart.options}
                                                    series={LoanPieChart.series}
                                                    type="donut"
                                                    height={350}
                                                />
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <h3>Customer Loan Volume</h3>
                                            {
                                                LoanBarChart !== "" &&
                                                <ReactApexChart
                                                    options={LoanBarChart.options}
                                                    series={LoanBarChart.series}
                                                    type="bar"
                                                    height={350}
                                                />
                                            }
                                        </div>
                                    </div>

                                    <hr />
                                    {
                                        LoanPayBack !== "" &&
                                        <div>
                                            <h3>Current Loan PayBack</h3>
                                            <ReactApexChart
                                                options={LoanPayBack.options}
                                                series={LoanPayBack.series}
                                                type="line"
                                                height={350} />

                                        </div>
                                    }


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        loginData: state.LoginDetails,
        branch_list: state.branch_list,
        designation_list: state.designation_list,
        staff_details: state.staff_details
    };
};

export default connect(mapStateToProps, null)(CustomerOverview)
