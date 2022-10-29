import { Token } from "@mui/icons-material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setCustomerDetails } from "../../../action/action";
import { currencyConverter, formatDate, formatDateAndTime } from "../../../constants/constants";
import { serverLink } from "../../../constants/url";
import ComponentLoader from "../../common/modal/component-loader";
import { NetworkErrorAlert } from "../../common/sweetalert/sweetalert";


const CustomerLoans = (props) => {
    const token = props.loginData[0].token
    const [Loans, setLoans] = useState([]);
    const [Loans2, setLoans2] = useState([]);

    const getData = async () => {
        try {
            await axios.get(`${serverLink}customer/loans/list/${props.customer[0]?.CustomerID}`, token).then((res) => {
                if (res.data.length > 0) {
                    props.setLoans(res.data);
                    setLoans(res.data);
                    setLoans2(res.data);
                    props.setLastLoan(res.data)
                }
            })
        } catch (e) {
            NetworkErrorAlert();
        }
    }

    useEffect(() => {
        if (props.customer.length > 0) {
            getData();
        }
    }, [])

    const onSearch = (e) => {
        let filtered = Loans2.length > 0 &&
            Loans2.filter(x => x.LoanType.toLowerCase().includes(e.target.valuetoLowerCase())) ||
            Loans2.filter(x => formatDateAndTime(x.DueDateLast, "date_and_time").includes(e.target.value)) ||
            Loans2.filter(x => x.LoanDuration.includes(e.target.value))
        setLoans(filtered)
    }

    return props.customer.length === 0 ? (<ComponentLoader />) : (

        <div className="col-12">
            <div className="card card-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h3 className="card-title">Loan Records</h3>
                        <div>
                            <input className="form-control" placeholder="search" onChange={onSearch} />
                        </div>
                    </div>
                    <div className="ratio ratio-16x9">
                        <div className="table-responsive">
                            <table className="table table-vcenter table-hover card-table">
                                <thead>
                                    <tr>
                                        <th>Loan Type</th>
                                        <th>Amount Applied</th>
                                        <th>Issueing Branch</th>
                                        <th>Duration</th>
                                        <th>Installments</th>
                                        <th>Last Due Date</th>
                                        <th>Application Status</th>
                                        <th>Loan Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Loans.length > 0 ?
                                            Loans.map((x, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{x.LoanType} </td>
                                                        <td className="text-muted">{currencyConverter(x.AmountApplied)}</td>
                                                        <td>{x.IssueingBranch}</td>
                                                        <td>{x.LoanDuration} Months</td>
                                                        <td>{currencyConverter(x.PayBackInstallments)}</td>
                                                        <td className="text-muted">{formatDateAndTime(x.DueDateLast, "date_and_time")}</td>
                                                        <td className="text-muted">
                                                            <span
                                                                className={x.ApplicationStatus === 0 ? "badge bg-info" :
                                                                    x.ApplicationStatus === 1 ? "badge bg-success" : "badge bg-danger"}>
                                                                {x.ApplicationStatus === 0 ? "Pending" :
                                                                    x.ApplicationStatus === 1 ? "Approved" : "Denied"}
                                                            </span>
                                                        </td>
                                                        <td className="text-muted">
                                                            <span className={x.PayBackStatus === 1 ?
                                                                "badge bg-info" : x.PayBackStatus === 2 ?
                                                                    "badge bg-success" : "badge bg-danger"} >
                                                                {x.PayBackStatus === 1 ? "Payback Ongoing" :
                                                                    x.PayBackStatus === 2 ? "Closed" : "Open"}
                                                            </span>
                                                        </td>
                                                        <td className="text-muted">
                                                            <Link to={`/loans/${x.ID}`} onClick={() => {
                                                                props.setOnCustomerDetails(props.customer)
                                                            }} className="btn btn-sm btn-info" >
                                                                View Details
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr className="text-center">
                                                <td>
                                                    <h2>
                                                    </h2>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
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

const mapDispatchToProps = (dispatch) => {
    return {
        setOnCustomerDetails: (p) => {
            dispatch(setCustomerDetails(p));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerLoans)
