import React from "react";
import { useState } from "react";
import ComponentLoader from "../common/modal/component-loader";
import zakat from '../../images/zakat.jpg';
import { serverLink } from "../../constants/url";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { useEffect } from "react";
import Loader from "../common/loader";
import { Audit, currencyConverter, formatDate, formatDateAndTime } from "../../constants/constants";
import DisbursementHistory from "./disbursement";
import PayBackHistory from "./payback";
import LoanNOK from "./next-of-kin";
import LoanGuarantor from "./loan-guarantor";
import LoanCollateral from "./loan-collateral";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { NetworkErrorAlert, showConfirm } from "../common/sweetalert/sweetalert";
import Modal from "../common/modal/modal";

const LoanDetails = (props) => {
    const token = props.loginData[0].token;
    const [isLoading, setIsLoading] = useState(true);
    const params = useLocation();
    const ApplicationID = params.pathname.split("/")[2];
    const [customer, setCustomer] = useState(props.customer_details.length > 0 ? props.customer_details : []);
    const [loanCollateral, setLoanCollateral] = useState([]);
    const [loanNOK, setLoanNOK] = useState([]);
    const [loanGuarantor, setLoanGuarantor] = useState([]);

    const [loanDetails, setLoanDetails] = useState([]);
    const [formData, setFormData] = useState({
        ID: "",
        DueDateLast: "",
        PrevEndDate: "",
        InsertedBy: props.loginData[0].StaffID
    })

    const [totalPayBack, setPayBack] = useState(0)
    const getData = async () => {
        await axios.get(`${serverLink}loan/loans/list/${ApplicationID}`, token).then(async (res) => {
            if (res.data.length > 0) {
                setFormData({
                    ...formData,
                    PrevEndDate: formatDateAndTime(res.data[0].DueDateLast),
                    DueDateLast: formatDate(res.data[0].DueDateLast)
                })
                setLoanDetails(res.data);

                await axios.get(`${serverLink}customer/personal_details/${res.data[0]?.CustomerID}`, token).then((res) => {
                    if (res.data.length > 0) {
                        setCustomer(res.data);
                    }
                    setIsLoading(false)
                })
            }
        })
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

    const Reset = () => {
        setFormData({
            ...formData,
            ID: "",

        })

    }

    const ApproveLoan = () => {
        if(loanCollateral.length === 0){
            toast.error("Please add Loan collateral")
            return false;
        }
        if(loanNOK.length === 0){
            toast.error("Please add Loan Next of Kin")
            return false;
        }
        if(loanGuarantor.length === 0){
            toast.error("Please add Loan Guarantor")
            return false;
        }

        swal({
            text: `Enter Approved Amount \n Amount Applied is ${currencyConverter(loanDetails[0].AmountApplied)}`,
            content: "input",
            button: {
                text: "Approve!",
                closeModal: false,
            },
        })
            .then(val => {
                if (!val) {
                    toast.error("Please enter Amount");
                    throw null
                };
                if (parseInt(val) > parseInt(loanDetails[0].AmountApplied)) {
                    toast.error("Amount greater than Amount Applied");
                    throw null
                }

                return axios.put(`${serverLink}loan/aprove/${ApplicationID}`, { AmountApproved: val, ApplicationID: ApplicationID }, token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        Audit(`Loan with App. ID ${ApplicationID} Approved by ${formData.InsertedBy}`,
                            props.loginData[0].Branch,
                            formData.InsertedBy,
                            token)
                        toast.success("Loan Approved Successfully");
                        swal.stopLoading();
                        swal.close();

                    } else if (res.data.message === "err") {
                        toast.error("Entr numeric value...")
                    }
                    else {
                        toast.error("please try again...")
                    }
                });
            })
            .catch(err => {
                if (err) {
                    swal("Error!", "Network error!", "error");
                } else {
                    swal.stopLoading();
                    swal.close();
                }
            });
    }

    const extendDate = async (e) => {
        e.preventDefault();
        if (loanDetails[0]?.IsDefected === 1) {
            toast.error("Loan is defected, date cannot be extended");
            return false;
        }
        if (loanDetails[0]?.PayBackStatus === 2) {
            toast.error("Loan Already paid back completely");
            return false;
        }

        if (loanDetails[0]?.ApplicationStatus === 0) {
            toast.error("Loan Applications is still pending");
            return false;
        }
        try {
            await axios.put(`${serverLink}loan/extend_date`,
                { ApplicationID: ApplicationID, DueDateLast: formData.DueDateLast }, token).then((res) => {
                    if (res.data.message === 'success') {
                        getData();
                        Audit(`Loan with App. ID ${ApplicationID} Due Date extended from ${formData.PrevEndDate} to ${formData.DueDateLast} by ${formData.InsertedBy}`,
                            props.loginData[0].Branch,
                            formData.InsertedBy,
                            token)
                        document.getElementById("extend_date_close").click();
                        toast.success("End date successfully extended")
                    }
                })
        } catch (e) {
            NetworkErrorAlert();
        }
    }

    const addAsDefected = (e) => {
        if (loanDetails[0]?.ApplicationStatus === 0) {
            toast.error("Loan Applications is still pending");
            return false;
        }
        if (loanDetails[0]?.PayBackStatus === 2) {
            toast.error("Loan Already paid back completely, Loan cannot be defected");
            return false;
        }
        try {
            showConfirm("Warning", "Are you sure you want to add this loan as defected?", "warning")
            .then(async (isConfirmed) => {
                if (isConfirmed) {
                    await axios.put(`${serverLink}loan/add_defected/${ApplicationID}`, formData, token).then((res) => {
                        if (res.data.message === 'success') {
                            toast.success("Loan Status Changed")
                        }
                    })
                }
            })
        } catch (e) {
            console.log(e)
            NetworkErrorAlert();
        }
    }

    return isLoading ? (<Loader />) : (
        <div className="page-body">
            <div className="container-xl">
                <div className="card">
                    <div className="col d-flex flex-column">
                        <div className="card-body">
                            {
                                customer.length > 0 ?
                                    <div className="row">
                                        <div className="d-flex justify-content-between">
                                            <h2 className="mb-4">
                                                {customer[0].Surname} {customer[0].MiddleName} {customer[0].FirstName} {customer[0].CustomerID}</h2>
                                            <h3>
                                                {
                                                    props.loan_types.length > 0 &&
                                                    props.loan_types.filter(x => x.LoanCode === loanDetails[0].LoanType)[0].LoanName + " (" + loanDetails[0].LoanType + ")"
                                                }

                                            </h3>
                                            <div className="row g-2 align-items-center">
                                                <div className="col-6 col-sm-4 col-md-2 col-xl py-3">
                                                    <button
                                                        disabled={loanDetails[0]?.ApplicationStatus === 1 ? true : false}
                                                        onClick={ApproveLoan} className="btn btn-outline-success">
                                                        Approve Loan
                                                    </button>
                                                    <a href="#"
                                                        onClick={Reset} data-bs-toggle="modal" 
                                                        data-bs-target="#extent_date" className="btn btn-outline-primary ms-2">
                                                        Extend Due Date
                                                    </a>

                                                    <a href="#" onClick={addAsDefected} className="btn btn-outline-danger ms-2">
                                                        Add as Defected
                                                    </a>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-md-12" >
                                            <div className="row">

                                                <div className="col-md-8">

                                                    {
                                                        loanDetails.length > 0 ?
                                                            <>
                                                                <div className="datagrid h3">
                                                                    <div className="datagrid-item">
                                                                        <div className="datagrid-title">Issueing Branch</div>
                                                                        <div className="datagrid-content">{props.branch_list.length > 0 && props.branch_list.filter(x => x.BranchCode === loanDetails[0].IssueingBranch)[0].BranchName}</div>
                                                                    </div>
                                                                    <div className="datagrid-item">
                                                                        <div className="datagrid-title">Amount Applied</div>
                                                                        <div className="datagrid-content">
                                                                            {currencyConverter(loanDetails[0].AmountApplied)}</div>
                                                                    </div>
                                                                    <div className="datagrid-item">
                                                                        <div className="datagrid-title">Loan Type</div>
                                                                        <div className="datagrid-content">{loanDetails[0].LoanType}</div>
                                                                    </div>
                                                                    <div className="datagrid-item">
                                                                        <div className="datagrid-title">Loan Duration</div>
                                                                        <div className="datagrid-content">{loanDetails[0].LoanDuration} Months </div>
                                                                    </div>
                                                                    <div className="datagrid-item">
                                                                        <div className="datagrid-title">First Due Date</div>
                                                                        <div className="datagrid-content">
                                                                            {formatDateAndTime(loanDetails[0].DueDateFirst, "date")} </div>
                                                                    </div>
                                                                    <div className="datagrid-item">
                                                                        <div className="datagrid-title">Last Due Date</div>
                                                                        <div className="datagrid-content">
                                                                            {formatDateAndTime(loanDetails[0].DueDateLast, "date")} </div>
                                                                    </div>

                                                                </div>
                                                                <hr />
                                                                <div className="datagrid h3">
                                                                    <div className="datagrid-item">
                                                                        <div className="datagrid-title">Payback Installments</div>
                                                                        <div className="datagrid-content">
                                                                            {currencyConverter(loanDetails[0].PayBackInstallments)} </div>
                                                                    </div>
                                                                    <div className="datagrid-item">
                                                                        <div className="datagrid-title">Application Date</div>
                                                                        <div className="datagrid-content">
                                                                            {formatDateAndTime(loanDetails[0].InsertedDate, "date")} </div>
                                                                    </div>
                                                                    <div className="datagrid-item">
                                                                        <div className="datagrid-title">Disbursement Account</div>
                                                                        <div className="datagrid-content">
                                                                            {loanDetails[0].AccountName} </div>
                                                                    </div>
                                                                    <div className="datagrid-item">
                                                                        <div className="datagrid-title">Account Number</div>
                                                                        <div className="datagrid-content">
                                                                            {loanDetails[0].AccountNumber} </div>
                                                                    </div>
                                                                    <div className="datagrid-item">
                                                                        <div className="datagrid-title">Bank Name</div>
                                                                        <div className="datagrid-content">
                                                                            {loanDetails[0].BankName} </div>
                                                                    </div>
                                                                </div>


                                                            </>
                                                            :
                                                            <ComponentLoader />
                                                    }


                                                </div>
                                                <div className="col-md-4">
                                                    <div className="card-link" href="#">
                                                        <div className="card-cover card-cover-blurred text-center" style={{
                                                            backgroundImage: `url(${customer[0]?.Passport === "" ?
                                                                zakat : `${serverLink}public/uploads/customer/${customer[0]?.Passport}`})`
                                                        }} >
                                                            <span className="avatar avatar-xl" style={{
                                                                backgroundImage: `url(${customer[0]?.Passport === "" ?
                                                                    zakat : `${serverLink}public/uploads/customer/${customer[0]?.Passport}`})`
                                                            }} ></span>
                                                        </div>
                                                    </div>
                                                    {
                                                        loanDetails.length > 0 &&
                                                        <div className="row col-md-12">
                                                            <div className="col-md-6">
                                                                <div className="datagrid h3 mt-3">
                                                                    <div className="datagrid-item">
                                                                        <div className="datagrid-title">Application Status</div>
                                                                        <div className="datagrid-content">
                                                                            <span
                                                                                className={loanDetails[0]?.ApplicationStatus === 0 ? "badge bg-info" :
                                                                                    loanDetails[0]?.ApplicationStatus === 1 ? "badge bg-success" : "badge bg-danger"}>
                                                                                {loanDetails[0]?.ApplicationStatus === 0 ? "Pending" :
                                                                                    loanDetails[0]?.ApplicationStatus === 1 ? "Approved" : "Denied"}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="datagrid-item">
                                                                        <div className="datagrid-title">Pay Back/Loan Status</div>
                                                                        <div className="datagrid-content">
                                                                            <span className={loanDetails[0]?.PayBackStatus === 1 ?
                                                                                "badge bg-info" : loanDetails[0]?.PayBackStatus === 2 ?
                                                                                    "badge bg-success" : "badge bg-danger"}>
                                                                                {loanDetails[0]?.PayBackStatus === 1 ? "Payback Started" :
                                                                                    loanDetails[0]?.PayBackStatus === 2 ? "Fully Paid/ Closed " : "Open"}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="datagrid-item">
                                                                        <div className="datagrid-title">Is Defected ?</div>
                                                                        <div className="datagrid-content">
                                                                            <span className={loanDetails[0]?.IsDefected.toString() !== '1' ?
                                                                                "badge bg-success" : "badge bg-danger"}>
                                                                                {loanDetails[0]?.IsDefected.toString() !== '1' ?
                                                                                    "NO" : "YES"}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="card card-body mt-3 h3">
                                                                    Total Borrowed : {currencyConverter(loanDetails[0].AmountApplied)}

                                                                </div>
                                                                <div className="card card-body mt-3 h3">
                                                                    Total Payback : {currencyConverter(totalPayBack)}
                                                                </div>
                                                                <div className="card card-body mt-3 h3">
                                                                    In Debt:<br />
                                                                    {
                                                                        currencyConverter(
                                                                            parseInt(loanDetails[0].AmountApplied) -
                                                                            parseInt(totalPayBack))
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    :
                                    <ComponentLoader />
                            }

                            <Modal id="extent_date" close="extend_date_close" size="modal-sm" title="Extend Loan Due Date">
                                <form onSubmit={extendDate}>
                                    <div className="col-md-6 col-xl-12">
                                        <div className="mb-3">
                                            <label className="form-label required">Last Due Date</label>
                                            <input type="date" className="form-control" id="DueDateLast" value={formData.DueDateLast} onChange={onEdit} required min={loanDetails.length > 0 && formatDate(loanDetails[0].DueDateLast)} />
                                        </div>
                                        <div className="mb-3">
                                            <button type="submit" className="btn bt-sm btn-primary w-100">
                                                Submit
                                            </button>
                                        </div>

                                    </div>
                                </form>

                            </Modal>

                            <div className="container-xl mt-4">
                                <ul className="nav nav-bordered mb-4" data-bs-toggle="tabs" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a href="#tabs-nok" className="nav-link" data-bs-toggle="tab" aria-selected="false" tabIndex={-1} role="tab">Next of Kin</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a href="#tabs-guarantor" className="nav-link" data-bs-toggle="tab" aria-selected="false" tabIndex={-1} role="tab">Loan Guarantor</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a href="#tabs-collateral" className="nav-link" data-bs-toggle="tab" aria-selected="false" tabIndex={-1} role="tab">Loan Collaterals</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a href="#tabs-disbursement" className="nav-link" data-bs-toggle="tab" aria-selected="true" role="tab">Disbursement</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a href="#tabs-payback" className="nav-link active" data-bs-toggle="tab" aria-selected="false" tabIndex={-1} role="tab">Payback History</a>
                                    </li>

                                </ul>
                                <div className="card-body">
                                    <div className="tab-content">
                                        {
                                            customer.length > 0 &&
                                            <div className="tab-pane" id="tabs-disbursement" role="tabpanel">
                                                <DisbursementHistory
                                                    ApplicationID={ApplicationID}
                                                    token={token}
                                                    customer={customer} />

                                            </div>
                                        }

                                        {
                                            customer.length > 0 &&
                                            <div className="tab-pane active show" id="tabs-payback" role="tabpanel">
                                                <PayBackHistory
                                                    ApplicationID={ApplicationID}
                                                    token={token}
                                                    customer={customer}
                                                    loanDetails={loanDetails}
                                                    setPayBack={setPayBack}
                                                    getData={getData}
                                                />

                                            </div>
                                        }

                                        {
                                            customer.length > 0 &&
                                            <div className="tab-pane" id="tabs-nok" role="tabpanel">
                                                <LoanNOK
                                                    ApplicationID={ApplicationID}
                                                    token={token}
                                                    customer={customer}
                                                    setLoanNOK={setLoanNOK}
                                                />

                                            </div>
                                        }

                                        {
                                            customer.length > 0 &&
                                            <div className="tab-pane" id="tabs-guarantor" role="tabpanel">
                                                <LoanGuarantor
                                                    ApplicationID={ApplicationID}
                                                    token={token}
                                                    customer={customer}
                                                    setLoanGuarantor={setLoanGuarantor}
                                                    
                                                />

                                            </div>
                                        }

                                        {
                                            customer.length > 0 &&
                                            <div className="tab-pane" id="tabs-collateral" role="tabpanel">
                                                <LoanCollateral
                                                    ApplicationID={ApplicationID}
                                                    token={token}
                                                    customer={customer}
                                                    setLoanCollateral={setLoanCollateral}
                                                />

                                            </div>
                                        }

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        loginData: state.LoginDetails,
        branch_list: state.branch_list,
        designation_list: state.designation_list,
        staff_details: state.staff_details,
        loan_types: state.loan_types_list,
        customer_details: state.customer_details
    };
};

export default connect(mapStateToProps, null)(LoanDetails)
