import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { currencyConverter } from "../../../constants/constants";
import { serverLink } from "../../../constants/url";


const CustomerOverview = (props) => {
    const token = props.loginData[0].token;
    const [TotalAccounts, setTotalAccounts] = useState([]);
    const [TotalBalance, setTotalBalance] = useState([]);
    const [TotalDebit, setTotalDebit] = useState([]);
    const [TotalCredit, setTotalCredit] = useState([]);
    const [TotalLoans, setTotalLoans] = useState([]);
    const [WeeklyTrasactionsData, setWeeklyTrasactionData] = useState([]);

    const getData = async () => {
        try {
            await axios.get(`${serverLink}customer/overview/${props.customer[0].CustomerID}`, token).then((res) => {
                if (res.data.length > 0) {
                    setTotalAccounts(res.data[0].TotalAccounts);
                    setTotalBalance(res.data[0].TotalBalance);
                    setTotalDebit(res.data[0].TotalDebit);
                    setTotalCredit(res.data[0].TotalCredit);
                    setTotalLoans(res.data[0].TotalLoans);
                    setWeeklyTrasactionData(res.data[0].WeeklyTrasactionsData)
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
                                    Total Registered Accounts
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            <div className="col-md-2">
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
                                    Total Debit Transactions
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-2">
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
                                    Total Credit Transactions
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-2">
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


            <div className="col-12 col-md-6 col-lg">
                <div className="mb-4 mt-5">
                    <div className="row row-cards">
                        <div className="col-12">
                            <div className="card card-sm">
                                <div className="card-body">
                                    <h3 className="card-title">Analytics</h3>
                                    <div className="ratio ratio-16x9">
                                        <img src="./static/projects/dashboard-1.png" className="rounded object-cover" alt="Enable analytics tracking" />
                                    </div>

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
