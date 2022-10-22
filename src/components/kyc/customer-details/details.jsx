import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { currencyConverter, decryptData, encryptData, formatDate } from "../../../constants/constants";
import { serverLink } from "../../../constants/url";
import zakat from '../../../images/zakat.jpg'
import Loader from "../../common/loader";
import ComponentLoader from "../../common/modal/component-loader";
import Modal from "../../common/modal/modal";
import { NetworkErrorAlert, showAlert, showConfirm } from "../../common/sweetalert/sweetalert";
import CustomerAccounts from "./accounts";
import CustomerLoans from "./loans";
import CustomerNextOfKin from "./next-of-kin";
import CustomerOverview from "./overview";
import CustomerTransactions from "./transactions";

const CustomerDetails = (props) => {
    const params = useLocation();
    const customerID = params.pathname.split("/")[2]

    const [isLoading, setIsLoading] = useState(false);
    const [LastLoan, setLastLoan] = useState([])

    const token = props.loginData[0].token
    const [bvn, setBvn] = useState('');
    const [loanTypes, setLoanTypes] = useState(props.loan_types.length > 0 ? props.loan_types : [])

    const [customer, setCustomer] = useState([])
    const [formData, setFormData] = useState({
        LoanType: "",
        MaxAmount: "",
        MinAmount: "",
        IssueingBranch: props.loginData[0].Branch,
        customerID: customerID,
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
        Ltype:""
    })

    const getData = async () => {
        await axios.get(`${serverLink}settings/loan_types/list`, token).then((res) => {
            if (res.data.length > 0) {
                setLoanTypes(res.data)
            }
        })
        await axios.get(`${serverLink}customer/personal_details/${customerID}`, token).then((res) => {
            if (res.data.length > 0) {
                setBvn(res.data[0]?.Bvn)
                setCustomer(res.data);
            }
            setIsLoading(false)
        })
        await axios.get(`${serverLink}loan/last_loan/${customerID}`, token).then((res) => {
            if (res.data.length > 0) {
                setFormData({
                    ...formData,
                    LastLoanPaid: formatDate(res.data[0]?.LastLoanPaid),
                    LastLoanReceived: (formatDate(res.data[1]?.LastLoanReceived))
                })
            }
        })
    }

    useEffect(() => {
        getData();

    }, [])

    const onEdit = (e) => {
        if (e.target.id === "LoanType") {
            let val = e.target.value.split(",");
            setFormData({
                ...formData,
                LoanType: val[0],
                MaxAmount: val[1],
                MinAmount: val[2],
                Ltype: e.target.value
            })
            return false;
        }
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const veryfyBVN = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${serverLink}customer/verify_bvn`, { Bvn: bvn, CustomerID: customerID }, token).then((res) => {
                if (res.data.message === 'success') {
                    getData();
                    document.getElementById("Close").click();
                    toast.success('BVN verified');
                } else if (res.data.message === 'no record') {
                    toast.error('BVN is Invalid')
                } else {
                    toast.error('network error...')
                }
            })

        } catch (e) {
            NetworkErrorAlert()
        }
    }

    const applyLoan = (e) => {
        e.preventDefault();
        if (formData.AmountApplied < formData.MinAmount) {
            toast.error("Amount less than minimum value");
            return false;

        }
        if (formData.AmountApplied > formData.MaxAmount) {
            toast.error("Amount is more than maximum value");
            return false;
        }
        try {
            showConfirm("Warning", "Submit Loan Application?", "warning").then(async (isConfirm) => {
                if (isConfirm) {
                    await axios.post(`${serverLink}loan/apply`, formData, token).then((res) => {
                        if (res.data.message === 'success') {
                            document.getElementById("Close").click();

                        } else {
                            toast.error("please try again");
                        }
                    })
                }
            })
        } catch (e) {
            NetworkErrorAlert();
        }

    }

    const Reset = () => {
        setFormData({
            ...formData,
            LoanType: "",
            MaxAmount: "",
            MinAmount: "",
            IssueingBranch: props.loginData[0].Branch,
            customerID: customerID,
            AmountApplied: "",
            PayBackInstallments: "",
            LoanDuration: "",
            DueDateFirst: "",
            DueDateLast: "",
            AccountName: "",
            AccountNumber: "",
            BankName: "",
            InsertedBy: props.loginData[0].StaffID,
        })
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
                                            <h2 className="mb-4">{customer[0].Surname} {customer[0].MiddleName} {customer[0].FirstName}</h2>
                                            <div className="row g-2 align-items-center">
                                                <div className="col-6 col-sm-4 col-md-2 col-xl py-3">
                                                    <a href="#" data-bs-toggle="modal" data-bs-target="#bvn-modal" className="btn btn-outline-success">
                                                        Verifiy BVN
                                                    </a>
                                                    <a href="#" onClick={Reset} data-bs-toggle="modal" data-bs-target="#loan-modal" className="btn btn-outline-primary ms-2">
                                                        Apply Loan
                                                    </a>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-6">
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
                                                </div>
                                                <div className="col-md-6">
                                                    <p className="h3">
                                                        Branch: {props.branch_list.length > 0 &&
                                                            props.branch_list.filter(x => x.BranchCode.trim() === customer[0].Branch.trim())[0].BranchName}
                                                    </p>
                                                    <address className="h4">
                                                        Email: {customer[0].Email.trim()}<br />
                                                        Phone: {customer[0].Phone.trim()}<br />
                                                        Gender: {customer[0].Gender.trim()}<br />
                                                        BVN: {customer[0].Bvn.trim()}
                                                    </address>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-6 text-start">
                                                    <p className="h3">Account Status</p>
                                                    <p> Account Status: <label
                                                        className={customer[0]?.Status === 1 ? 'badge bg-success' : 'badge bg-danger'}>
                                                        {customer[0]?.Status === 1 ? 'Active' : 'InActive'}
                                                    </label>
                                                    </p>
                                                    <p>BVN Status: <label
                                                        className={customer[0]?.BvnStatus === 1 ? 'badge bg-success' : 'badge bg-danger'}>
                                                        {customer[0]?.BvnStatus === 1 ? 'Veified' : 'Not Verified'}
                                                    </label>
                                                    </p>
                                                </div>
                                                <div className="col-md-6 text-end">
                                                    <p className="h3">Address</p>
                                                    <address>
                                                        {customer[0]?.LandMark.trim()} <br />
                                                        {customer[0]?.Address.trim()}<br />
                                                        {customer[0]?.Lga.trim()}<br />
                                                        {customer[0]?.StateOfOrigin.trim()} State<br />
                                                    </address>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <ComponentLoader />
                            }


                            <div className="container-xl mt-4">
                                <ul className="nav nav-bordered mb-4" data-bs-toggle="tabs" role="tablist">
                                    <li className="nav-item w-5" role="presentation">
                                        <a href="#tabs-home-w" className="nav-link active" data-bs-toggle="tab" aria-selected="true" role="tab">Home</a>
                                    </li>
                                    <li className="nav-item w-5" role="presentation">
                                        <a href="#tabs-accounts" className="nav-link" data-bs-toggle="tab" aria-selected="false" tabIndex={-1} role="tab">Accounts</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a href="#tabs-transactions" className="nav-link" data-bs-toggle="tab" aria-selected="false" tabIndex={-1} role="tab">Transactions</a>
                                    </li>
                                    <li className="nav-item w-5" role="presentation">
                                        <a href="#tabs-loans" className="nav-link" data-bs-toggle="tab" aria-selected="false" tabIndex={-1} role="tab">Loans</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a href="#tabs-next-of-kin" className="nav-link" data-bs-toggle="tab" aria-selected="false" tabIndex={-1} role="tab">Next of Kin</a>
                                    </li>
                                </ul>
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="tab-pane active show" id="tabs-home-w" role="tabpanel">
                                            {
                                                customer.length > 0 ?
                                                    <CustomerOverview customer={customer} /> : <ComponentLoader />
                                            }

                                        </div>
                                        <div className="tab-pane" id="tabs-accounts" role="tabpanel">
                                            {
                                                customer.length > 0 ?
                                                    <CustomerAccounts customer={customer} /> : <ComponentLoader />
                                            }
                                        </div>

                                        <div className="tab-pane" id="tabs-transactions" role="tabpanel">
                                            {
                                                customer.length > 0 ?
                                                    <CustomerTransactions customer={customer} /> : <ComponentLoader />
                                            }
                                        </div>
                                        <div className="tab-pane" id="tabs-loans" role="tabpanel">
                                            {
                                                customer.length > 0 ?
                                                    <CustomerLoans customer={customer} setLastLoan={setLastLoan} /> : <ComponentLoader />
                                            }
                                        </div>
                                        <div className="tab-pane" id="tabs-next-of-kin" role="tabpanel">
                                            {
                                                customer.length > 0 ?
                                                    <CustomerNextOfKin customer={customer} /> : <ComponentLoader />
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <Modal id="bvn-modal" size="modal-sm" title="Verify BVN">
                                <form onSubmit={veryfyBVN}>
                                    <div className="col-md-6 col-xl-12">
                                        <div className="mb-3">
                                            <label className="form-label required">BVN</label>
                                            <input type="text" disabled className="form-control" onChange={onEdit} value={bvn} required placeholder="BVN Number" />
                                        </div>

                                        <div className="mb-3">
                                            <button type="submit" className="btn bt-sm btn-primary w-100">
                                                Verify
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </Modal>

                            <Modal id="loan-modal" title="Apply for Loan">
                                <form onSubmit={applyLoan}>
                                    <div className="col-md-6 col-xl-12">
                                        <div className="mb-3">
                                            <label className="form-label required">Loan Type</label>
                                            <select className="form-control form-select" value={formData.Ltype} onChange={onEdit} id="LoanType" required >
                                                <option value={""} >-select options-</option>
                                                {
                                                    loanTypes.length > 0 &&
                                                    loanTypes.map((x, i) => {
                                                        return (
                                                            <option value={x.LoanCode + "," + x.MaxAmount + "," + x.MinAmount} key={i} >{x.LoanName}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        {
                                            formData.LoanType !== "" &&
                                            <div className="row text-danger">
                                                <div className="col-md-4">
                                                    <h4>Min: {currencyConverter(formData.MinAmount)}</h4>
                                                </div>
                                                <div className="col-md-4">
                                                    <h4>Max: {currencyConverter(formData.MaxAmount)}</h4>
                                                </div>
                                            </div>
                                        }
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label required">Amount Applied</label>
                                                    <input type="number" className="form-control" id="AmountApplied" onChange={onEdit} value={formData.AmountApplied} required placeholder="Amount" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">PayBack Installments Amount</label>
                                                    <input type="number" className="form-control" id="PayBackInstallments" onChange={onEdit} value={formData.PayBackInstallments} placeholder="Amount" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label required">Loan Duration <small>(months)</small></label>
                                                    <input type="number" className="form-control" id="LoanDuration" onChange={onEdit} value={formData.LoanDuration} required placeholder="e.g 4" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label required">First Due Date</label>
                                                    <input type="date" className="form-control" id="DueDateFirst" onChange={onEdit} value={formData.DueDateFirst} required />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label required">Last Due Date</label>
                                                    <input type="date" className="form-control" id="DueDateLast" onChange={onEdit} value={formData.DueDateLast} required />
                                                </div>
                                            </div>
                                            {
                                                formData.LastLoanPaid !== "" &&
                                                <>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label required">Date Last Loan Received</label>
                                                            <input type="date" disabled className="form-control" id="LastLoanReceived" onChange={onEdit} value={formData.LastLoanReceived} required />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label required">Date Last Loan Paid</label>
                                                            <input type="date" className="form-control" id="LastLoanPaid" onChange={onEdit} value={formData.LastLoanPaid} disabled required />
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        <hr />
                                        <h4>Disbursement Account Details</h4>
                                        <div className="mb-3">
                                            <label className="form-label required">Bank Name</label>
                                            <input type="text" className="form-control" id="BankName" onChange={onEdit} value={formData.BankName} required />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label required">Account Name</label>
                                            <input type="text" className="form-control" id="AccountName" onChange={onEdit} value={formData.AccountName} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label required">Account Number</label>
                                            <input type="text" className="form-control" id="AccountNumber" onChange={onEdit} value={formData.AccountNumber} required />
                                        </div>

                                        <div className="mb-3">
                                            <button type="submit" className="btn bt-sm btn-primary w-100">
                                                Submit Application
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </Modal>
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
        staff_details: state.staff_details,
        loan_types: state.loan_types_list
    };
};

export default connect(mapStateToProps, null)(CustomerDetails)