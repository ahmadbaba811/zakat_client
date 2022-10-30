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


const PayBackHistory = (props) => {
    const [isLoading, setIsLoading] = useState(true)

    const [payback, setpayback] = useState([]);
    const [formData, setFormData] = useState({
        CustomerID: props.customer[0]?.CustomerID,
        ApplicationID: props.ApplicationID,
        Branch: props.loginData[0]?.Branch,
        AmountPaid: "",
        PaymentMode: "",
        InsertedBy: props.loginData[0]?.StaffID
    })
    const [totalPaid, setTotalPaid] = useState(0)
    const [btn, setBtn] = useState({
        Text: "Add Payback Record",
        className: "btn-primary",
        disabled: false
    })

    const getData = async () => {
        if (props.loanDetails[0]?.ApplicationStatus !== 1) {
            setBtn({
                ...btn,
                Text: "Loan Not Approved",
                className: "btn-info",
                disabled: true
            })
        }
        try {
            await axios.get(`${serverLink}loan/payback/list/${props.ApplicationID}`, props.token).then((res) => {
                if (res.data.length > 0) {
                    setpayback(res.data);
                    let amounts = [];
                    res.data.map((x, i) => {
                        amounts.push(x.AmountPaid);
                    })
                    props.setPayBack(parseInt(amounts.reduce((a, b) => a + b, 0)))
                    setTotalPaid(parseInt(amounts.reduce((a, b) => a + b, 0)))
                    if (parseInt(amounts.reduce((a, b) => a + b, 0)) >= parseInt(props.loanDetails[0]?.AmountApplied)) {
                        setBtn({
                            ...btn,
                            Text: "Loan Fully Repaid",
                            className: "btn-success",
                            disabled: true
                        })
                    }
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
            Branch: props.loginData[0]?.Branch
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (totalPaid >= parseInt(props.loanDetails[0]?.AmountApplied)) {
            toast.error("Loan have been fully repaid")
            return false;
        }
        if (totalPaid + parseInt(formData.AmountPaid) > parseInt(props.loanDetails[0]?.AmountApplied)) {
            toast.error("Total Amount is Higher than borrowed value");
            return false;
        }
        try {
            await axios.post(`${serverLink}loan/payback/add`, formData, props.token).then((res) => {
                if (res.data.message === "success") {
                    Audit(`${currencyConverter(formData.AmountPaid)} paid in as payback for Loan ${props.ApplicationID}`, formData.Branch, formData.InsertedBy, props.token)
                    getData();
                    document.getElementById("close_payback").click();
                    toast.success("Payback record added");
                }
            })
            if (totalPaid + parseInt(formData.AmountPaid) === parseInt(props.loanDetails[0]?.AmountApplied)) {
                await axios.put(`${serverLink}loan/payback/complete_payback`, formData, props.token).then((res) => {
                    if (res.data.message === "success") {
                        Audit(`Loan ${props.ApplicationID} fully paid back by ${formData.InsertedBy}`, formData.Branch, formData.InsertedBy, props.token)
                        props.getData();
                    }
                })
            }

        } catch (e) {
            console.log(e)
            NetworkErrorAlert();
        }

    }


    const Reset = () => {
        setFormData({
            ...formData,
            AmountPaid: "",
            PaymentMode: ""
        })

    }

    return isLoading ? (<ComponentLoader />) : (
        <div className="col-12">
            <div className="card card-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-end">
                        <button
                            data-bs-toggle="modal" disabled={btn.disabled} onClick={Reset} data-bs-target={"#payback-modal"} className={`btn btn-md ${btn.className}`}>
                            {btn.Text}
                        </button>
                    </div>
                    <div className="ratio ratio-16x9">
                        <div className="table-responsive">
                            <table className="table table-vcenter table-hover card-table">
                                <thead>
                                    <tr>
                                        <th>Branch</th>
                                        <th>Amount Paid</th>
                                        <th>Payment Mode</th>
                                        <th>Payment Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        payback.length > 0 ?
                                            payback.map((x, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>
                                                            {
                                                                props.branch_list.length > 0 &&
                                                                props.branch_list.filter(j => j.BranchCode === x.Branch)[0].BranchName
                                                            }
                                                        </td>
                                                        <td>{currencyConverter(x.AmountPaid)}</td>
                                                        <td>{x.PaymentMode}</td>
                                                        <td>{formatDateAndTime(x.InsertedDate, "date_and_time")}</td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr className="text-center">
                                                <td colSpan={7}>
                                                    <h3>
                                                        No payback Record
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

            <Modal id="payback-modal" title="Add Payback Record" close={"close_payback"}>
                <form onSubmit={onSubmit} >
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label required">Amount Paid</label>
                                <input type="number" className="form-control" id="AmountPaid" value={formData.AmountPaid} onChange={onEdit} required placeholder="Amount Paid" />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label required">Payment Mode</label>
                                <select className="form-control form-select" id="PaymentMode" onChange={onEdit} value={formData.PaymentMode} required >
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
        branch_list: state.branch_list,
    };
};

export default connect(mapStateToProps, null)(PayBackHistory)
