import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Audit, currencyConverter, formatDateAndTime } from "../../constants/constants";
import { serverLink } from "../../constants/url";
import ComponentLoader from "../common/modal/component-loader";
import Modal from "../common/modal/modal";
import { NetworkErrorAlert } from "../common/sweetalert/sweetalert";


const DisbursementHistory = (props) => {
    const [isLoading, setIsLoading] = useState(true)

    const [disbursementList, setDisbursementList] = useState([]);
    const [formData, setFormData] = useState({
        CustomerID: props.customer[0]?.CustomerID,
        ApplicationID: props.ApplicationID,
        IssueingBranch: props.loginData[0]?.Branch,
        AccountName: "",
        AccountNumber: "",
        BankName: "",
        AmountPaid: "",
        PaymentMode: "",
        PaymentStatus: "",
        Reciept: "",
        PaymentDate: "",
        InsertedBy: props.loginData[0]?.StaffID
    })

    const getData = async () => {
        try {
            await axios.get(`${serverLink}loan/disbursement/list/${props.ApplicationID}`, props.token).then((res) => {
                if (res.data.length > 0) {
                    setDisbursementList(res.data)
                }
                setIsLoading(false)
            })
        } catch (e) {
            NetworkErrorAlert();
        }
    }
    useEffect(() => {
        getData();
    }, [])


    const onEdit = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
            IssueingBranch: props.loginData[0]?.Branch
        })
        if (e.target.id === "Reciept") {
            setFormData({
                ...formData,
                [e.target.id]: e.target.files[0]
            })
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const dt = new FormData();
        dt.append("File", formData.Reciept);
        dt.append("CustomerID", props.customer[0]?.CustomerID)
        dt.append("ApplicationID", props.ApplicationID)
        dt.append("IssueingBranch", props.loginData[0]?.Branch)
        dt.append("AccountName", formData.AccountName)
        dt.append("AccountNumber", formData.AccountNumber)
        dt.append("BankName", formData.BankName)
        dt.append("AmountPaid", formData.AmountPaid)
        dt.append("PaymentMode", formData.PaymentMode)
        dt.append("InsertedBy", props.loginData[0]?.StaffID)
        dt.append("PaymentDate", formData.PaymentDate)


        try {
            await axios.post(`${serverLink}loan/disbursement/add`, dt, props.token).then((res) => {
                if (res.data.message === "success") {
                    Audit(`${currencyConverter(formData.AmountPaid)} disbursed for Loan ${props.ApplicationID} by ${formData.InsertedBy}`, formData.IssueingBranch, formData.InsertedBy, props.token)
                    getData();
                    document.getElementById("Close").click();
                    toast.success("Disbursment record added");
                }
            })

        } catch (e) {
            console.log(e)
            NetworkErrorAlert();
        }

    }


    const Reset = () => {
        setFormData({
            ...formData,
            IssueingBranch: "",
            AccountName: "",
            AccountNumber: "",
            BankName: "",
            Bvn: "",
            AmountPaid: "",
            PaymentMode: "",
            PaymentStatus: "",
            Reciept: "",
            PaymentDate: "",
        })

    }

    return isLoading ? (<ComponentLoader />) : (
        <div className="col-12">
            <div className="card card-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-end">

                        <button
                            disabled={props.loanDetails[0]?.ApplicationStatus !== 1 ? true : false}
                            data-bs-toggle="modal" onClick={Reset} data-bs-target={"#disbursement-modal"} className="btn btn-md btn-primary">
                            {props.loanDetails[0]?.ApplicationStatus === 1 ? "Loan Not Approved" : "Add Disbursement Record"}
                        </button>
                    </div>
                    <div className="ratio ratio-16x9">
                        <div className="table-responsive">
                            <table className="table table-vcenter table-hover card-table">
                                <thead>
                                    <tr>
                                        <th>Account Name</th>
                                        <th>Account Number</th>
                                        <th>Bank Name</th>
                                        <th>Amount Paid</th>
                                        <th>Payment Mode</th>
                                        <th>Payment Status</th>
                                        <th>Payment Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        disbursementList.length > 0 ?
                                            disbursementList.map((x, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{x.AccountName}</td>
                                                        <td>{x.AccountNumber}</td>
                                                        <td>{x.BankName}</td>
                                                        <td>{currencyConverter(x.AmountPaid)}</td>
                                                        <td>{x.PaymentMode}</td>
                                                        <td>
                                                            <span className={x.PaymentStatus === 1 ? 'badge bg-success' : 'badge bg-danger'} >
                                                                {x.PaymentStatus === 1 ? 'Successful' : 'Failed'}
                                                            </span>
                                                        </td>
                                                        <td>{formatDateAndTime(x.InsertedDate, "date_and_time")}</td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr className="text-center">
                                                <td colSpan={7}>
                                                    <h3>
                                                        No Disbursement Record
                                                    </h3>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>


                    </div>
                </div>
            </div>
            <Modal id="disbursement-modal" title="Add Disbursement Record">
                <form onSubmit={onSubmit} >
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label required">Account Name</label>
                                <input type="text" className="form-control" id="AccountName" value={formData.AccountName} onChange={onEdit} required placeholder="Account Name" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label required">Account Number</label>
                                <input type="number" className="form-control" id="AccountNumber" value={formData.AccountNumber} onChange={onEdit} required placeholder="Account Number" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label required">Bank Name</label>
                                <input type="text" className="form-control" id="BankName" value={formData.BankName} onChange={onEdit} required placeholder="Bank Name" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label required">Amount Paid</label>
                                <input type="text" className="form-control" id="AmountPaid" value={formData.AmountPaid} onChange={onEdit} required placeholder="Amount Paid" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label required">Payment Date</label>
                                <input type="date" className="form-control" id="PaymentDate" value={formData.PaymentDate} onChange={onEdit} required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label required">Reciept</label>
                                <input type="file" className="form-control" id="Reciept" onChange={onEdit} required />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label required">Payment Mode</label>
                                <select className="form-control form-select" id="PaymentMode" onChange={onEdit} value={formData.PaymentMode} >
                                    <option value={""}>-select-</option>
                                    <option value={"Cash"}>Cash</option>
                                    <option value={"Online"}>Online</option>
                                </select>
                            </div>
                        </div>



                        <div className="col-md-12">
                            <div className="mb-3">
                                <button type="submit" className="btn bt-sm btn-primary w-100">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        loginData: state.LoginDetails,
    };
};

export default connect(mapStateToProps, null)(DisbursementHistory)
