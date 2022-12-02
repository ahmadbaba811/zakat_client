import { Token } from "@mui/icons-material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { currencyConverter, formatDate, formatDateAndTime } from "../../../constants/constants";
import { serverLink } from "../../../constants/url";
import ComponentLoader from "../../common/modal/component-loader";
import { NetworkErrorAlert } from "../../common/sweetalert/sweetalert";
import Modal from "../../common/modal/modal";



const CustomerAccounts = (props) => {
    const token = props.loginData[0].token
    const [accounts, setAccounts] = useState([]);
    const [accounts2, setAccounts2] = useState([]);
    const [confirming, setConfirming] = useState(false);
    const [reciever, setreciever] = useState(false);
    const [formData, setFormData] = useState({
        CustomerID: props.customer[0].CustomerID,
        AccountNo: "",
        TransactionType: "",
        TransactionDescription: "",
        TransactionAmount: "",
        CurrencyType: "NGN",
        RecieverAcctNo: "",
        TransactionBranch: props.loginData[0].Branch,
        InsertedBy: props.loginData[0].StaffID
    })

    const getData = async () => {
        try {
            await axios.get(`${serverLink}customer/accounts/list/${props.customer[0]?.CustomerID}`, token).then((res) => {
                if (res.data.length > 0) {
                    setAccounts(res.data);
                    setAccounts2(res.data)
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
        let filtered = accounts2.length > 0 &&
            accounts2.filter(x => x.AccountNo.includes(e.target.value)) ||
            accounts2.filter(x => x.AccountBalance.includes(e.target.value)) ||
            accounts2.filter(x => x.Bvn.includes(e.target.value)) ||
            accounts2.filter(x => x.AccountOpeningDate.includes(e.target.value))
        setAccounts(filtered)
    }
    const onEdit = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const ConfirmReciever = async () => {
        setConfirming(true);
        if (formData.RecieverAcctNo !== "") {
            try {
                await axios.get(`${serverLink}customer/account/${formData.RecieverAcctNo}`, token).then((res) => {
                    if (res.data.length > 0) {
                        setFormData({
                            ...formData,
                            RecieverAcctNo: res.data[0]?.AccountNo
                        })
                        setConfirming(false)
                        setreciever(res.data)
                    }
                })
            } catch (e) {
                NetworkErrorAlert();
            }
        }
        setConfirming(true)
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        // await axios.post(`${serverLink}loan/apply`, formData, token).then((res) => {
        //     if (res.data.message === 'success') {
        //         getData();
        //         toast.success("Loan Application successfully submitted")
        //         document.getElementById("Close_loan").click();

        //     } else {
        //         toast.error("please try again");
        //     }
        // })

    }

    const Reset = () => {
        setFormData({
            ...formData,
            CustomerID: props.customer[0].CustomerID,
            AccountNo: "",
            TransactionType: "",
            TransactionDescription: "",
            TransactionAmount: "",
            CurrencyType: "NGN",
            TransactionBranch: props.loginData[0].Branch,
            InsertedBy: props.loginData[0].StaffID
        })
    }


    return props.customer.length === 0 ? (<ComponentLoader />) : (

        <div className="col-12">
            <div className="card card-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h3 className="card-title">Registered Accounts</h3>
                        <div>
                            <input className="form-control" placeholder="search" onChange={onSearch} />
                        </div>
                    </div>

                    <div className="ratio ratio-16x9">
                        <div className="table-responsive">
                            <table className="table table-vcenter card-table">
                                <thead>
                                    <tr>
                                        <th>Account Number</th>
                                        <th>BVN</th>
                                        <th>Account Type</th>
                                        <th>Account Balance</th>
                                        <th>Opening Date</th>
                                        <th>Account Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        accounts.length > 0 ?
                                            accounts.map((x, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{x.AccountNo} </td>
                                                        <td className="text-muted">{x.Bvn}</td>
                                                        <td>{x.AccountType}</td>
                                                        <td className="text-muted">{currencyConverter(x.AccountBalance)}</td>
                                                        <td className="text-muted">{formatDateAndTime(x.AccountOpeningDate, "date_and_time")}</td>
                                                        <td className="text-muted">
                                                            <span className={x.AccountStatus === 1 ? "badge bg-success" : "badge bg-danger"}>
                                                                {x.AccountStatus === 1 ? "Active" : "InActive"}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <a data-bs-toggle="modal" onClick={() => {
                                                                Reset();
                                                                setFormData({
                                                                    ...formData,
                                                                    AccountNo: x.AccountNo
                                                                })

                                                            }} data-bs-target={"#transaction-modal"} className="btn btn-md btn-primary">
                                                                Transact
                                                            </a>
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

                    <Modal id="transaction-modal" title="Transaction Record">
                        <form onSubmit={onSubmit} >
                            <div className="col-md-6 col-xl-12">
                                <div className="mb-3">
                                    <label className="form-label required" >Transaction Type</label>
                                    <select className="form-control form-select" onChange={onEdit} value={formData.TransactionType} required id="TransactionType">
                                        <option value={""}>-Select Transaction Type- </option>
                                        <option value={"Credit"}>Credit</option>
                                        <option value={"Debit"}>Debit</option>
                                        <option value={"Transfer"}>Transfer</option>
                                    </select>
                                </div>
                                {
                                    formData.TransactionType === "Transfer" &&
                                    <div className="mb-3">
                                        <label className="form-label required">Reciever Account Number</label>
                                        <input type="number" className="form-control" id="RecieverAcctNo" value={formData.RecieverAcctNo} onChange={onEdit} onBlur={ConfirmReciever} required placeholder="Reciever Acct. No" />
                                        <label className="form-label mt-2 ms-2">
                                            {
                                                confirming === true &&
                                                <strong className="text-danger" style={{ fontSize: '10px' }}>
                                                    CONFIRMING RECEIVER, PLEASE WAIT...
                                                </strong>
                                            }

                                            {
                                                reciever.length > 0 &&
                                                <strong className="text-success" >
                                                    {reciever[0]?.FirstName}
                                                </strong>
                                            }
                                        </label>
                                    </div>
                                }


                                <div className="mb-3">
                                    <label className="form-label required">Transaction Amount</label>
                                    <input type="number" className="form-control" id="TransactionAmount" value={formData.TransactionAmount} onChange={onEdit} required placeholder="Transaction Amount" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label required">Transaction Description</label>
                                    <textarea type="text" rows={'5'} className="form-control" value={formData.TransactionDescription} id="TransactionDescription" onChange={onEdit} required placeholder="Transaction Description" >

                                    </textarea>
                                </div>

                                <div className="mb-3">
                                    <button type="submit" className="btn bt-sm btn-primary w-100">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Modal>
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

export default connect(mapStateToProps, null)(CustomerAccounts)
