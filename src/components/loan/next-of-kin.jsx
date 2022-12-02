import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { currencyConverter, formatDateAndTime } from "../../constants/constants";
import { serverLink } from "../../constants/url";
import ComponentLoader from "../common/modal/component-loader";
import Modal from "../common/modal/modal";
import { NetworkErrorAlert } from "../common/sweetalert/sweetalert";


const LoanNOK = (props) => {
    const [isLoading, setIsLoading] = useState(true)

    const [loan_nokList, setloan_nokList] = useState([]);
    const [cu_nok, setcu_nok] = useState([])
    const [formData, setFormData] = useState({
        CustomerID: props.customer[0]?.CustomerID,
        ApplicationID: props.ApplicationID,
        IssueingBranch: props.loginData[0]?.Branch,
        NextOfKinID: "",
        InsertedBy: props.loginData[0]?.StaffID
    })

    const [btn, setBtn] = useState({
        className: "btn-primary",
        disabled: false
    })

    const getData = async () => {
        if (props.loanDetails[0]?.ApplicationStatus !== 0) {
            setBtn({
                ...btn,
                className: "btn-info",
                disabled: true
            })
        }
        try {
            await axios.get(`${serverLink}customer/nex_of_kin/list/${props.customer[0]?.CustomerID}`, props.token).then((res) => {
                if (res.data.length > 0) {
                    setcu_nok(res.data)
                }
            })

            await axios.get(`${serverLink}loan/loan_nok/list/${props.ApplicationID}`, props.token).then((res) => {
                if (res.data.length > 0) {
                    props.setLoanNOK(res.data)
                    setloan_nokList(res.data)
                }
                setIsLoading(false)
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
            [e.target.id]: e.target.value,
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${serverLink}loan/loan_nok/add`, formData, props.token).then((res) => {
                if (res.data.message === "success") {
                    getData();
                    document.getElementById("nok_close").click();
                    toast.success("Next of Kin record added");
                } else if (res.data.message === "exists") {
                    toast.error("Next of kin already added")
                } else {
                    toast.error("network error")
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
            IssueingBranch: props.loginData[0]?.Branch,
            NextOfKinID: "",
        })

    }

    return isLoading ? (<ComponentLoader />) : (
        <div className="col-12">
            <div className="card card-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-end">
                        <button disabled={btn.disabled} data-bs-toggle="modal" onClick={Reset} data-bs-target={"#loan_nok-modal"} className="btn btn-md btn-primary">
                            Add Next of Kin
                        </button>
                    </div>
                    <div className="ratio ratio-16x9">
                        <div className="table-responsive">
                            <table className="table table-vcenter table-hover card-table">
                                <thead>
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Email Address</th>
                                        <th>Phone Number</th>
                                        <th>Relationship</th>
                                        <th>Occupation</th>
                                        <th>Address</th>
                                        <th>Inserted By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loan_nokList.length > 0 ?
                                            loan_nokList.map((x, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{x.Surname} {x.MiddleName} {x.FirstName} </td>
                                                        <td>{x.Email}</td>
                                                        <td>{x.Phone}</td>
                                                        <td>{x.Relationship}</td>
                                                        <td>{x.Occupation}</td>
                                                        <td>{x.Address}</td>
                                                        <td>{x.Inserted}</td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr className="text-center">
                                                <td colSpan={7}>
                                                    <h3>
                                                        No Next of Kin Record
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
            <Modal id="loan_nok-modal" title="Add Next of Kin for this Loan" close="nok_close">
                <form onSubmit={onSubmit} >
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label required">Next of Kin</label>
                                <select className="form-control form-select" id="NextOfKinID" value={formData.NextOfKinID} onChange={onEdit} required>
                                    <option value={""} >-select-</option>
                                    {
                                        cu_nok.length > 0 &&
                                        cu_nok.map((x, i) => {
                                            return (
                                                <option key={i} value={x.ID}>{x.FirstName} {x.MiddleName} {x.Surname} -- {x.Email}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                        </div>

                        <div className="col-md-12 mt-3">
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

export default connect(mapStateToProps, null)(LoanNOK)
