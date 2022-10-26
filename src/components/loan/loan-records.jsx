import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { currencyConverter, formatDateAndTime } from "../../constants/constants";
import { PageHeader } from "../common/pageHeader";
import ReportTable from "../common/table/report_table";
import Modal from "../common/modal/modal";
import { serverLink } from "../../constants/url";
import axios from "axios";
import { NetworkErrorAlert } from "../common/sweetalert/sweetalert";
import { useEffect } from "react";
import { Link } from "react-router-dom";


const LoanRecords = (props) => {
    const token = props.loginData[0].token;
    const [data, setData] = useState([]);
    const columns = ["SN", "CustomerID", "Type", "Amount Applied", "Branch", "Duration", "Installments", "Last Due Date", "App. Status", "Loan Status", "Action"];
    const [Loans, setLoans] = useState([])

    const [customer, setCustomer] = useState([])
    const [loanTypes, setLoanTypes] = useState(props.loan_types.length > 0 ? props.loan_types : [])

    const [formData, setFormData] = useState({
        LoanType: "",
        MaxAmount: "",
        MinAmount: "",
        IssueingBranch: props.loginData[0].Branch,
        CustomerID: "",
        AmountApplied: "",
        PayBackInstallments: "",
        LoanDuration: "",
        DueDateFirst: "",
        DueDateLast: "",
        AccountName: "",
        AccountNumber: "",
        BankName: "",
        LastLoanReceived: "",
        LastLoanPaid: "",
        InsertedBy: props.loginData[0].StaffID,
    })

    const getData = async () => {
        try {
            await axios.get(`${serverLink}loan/loans/list`, token).then((res) => {
                console.log(res.data[0])
                if (res.data.length > 0) {
                    let rows = [];
                    res.data.map((x, i) => {
                        rows.push([
                            i + 1,
                            x.CustomerID,
                            x.LoanType,
                            currencyConverter(x.AmountApplied),
                            x.IssueingBranch,
                            x.LoanDuration +" Months",
                            currencyConverter(x.PayBackInstallments),
                            formatDateAndTime(x.DueDateLast, "date"),
                            <span
                                className={x.ApplicationStatus === 0 ? "badge bg-info" :
                                    x.ApplicationStatus === 1 ? "badge bg-success" : "badge bg-danger"}>
                                {x.ApplicationStatus === 0 ? "Pending" :
                                    x.ApplicationStatus === 1 ? "Approved" : "Denied"}
                            </span>,
                            <span className={x.PayBackStatus === 1 ? "badge bg-success" : "badge bg-danger"}>
                                {x.PayBackStatus === 1 ? "Closed" : "Open"}
                            </span>,
                            <Link to={`/loans/${x.ID}`} className="btn btn-sm btn-info" >
                                View Details
                            </Link>
                        ])
                    })
                    setData(rows);
                }
            })
        } catch (e) {
            console.log(e)
            NetworkErrorAlert();
        }
    }

    useEffect(() => {
        getData();

    }, [])


    const onEdit = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const Reset = (e) => {
        setFormData({
            ...formData,
            LoanType: "",
            MaxAmount: "",
            MinAmount: "",
            IssueingBranch: props.loginData[0].Branch,
            CustomerID: "",
            AmountApplied: "",
            PayBackInstallments: "",
            LoanDuration: "",
            DueDateFirst: "",
            DueDateLast: "",
            AccountName: "",
            AccountNumber: "",
            BankName: "",
            LastLoanReceived: "",
            LastLoanPaid: "",
            InsertedBy: props.loginData[0].StaffID,
        })
    }

    return (
        <div className="page-wrapper">
            <PageHeader target="modal-large" Reset={Reset} title={["Loans", "Loans", "All Loans"]} />

            <div className="page-body">
                <div className="container-xl">
                    <div className="row row-deck row-cards">

                        <ReportTable columns={columns} data={data} />

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
        staff_details: state.staff_details,
        loan_types: state.loan_types_list
    };
};

export default connect(mapStateToProps, null)(LoanRecords)

