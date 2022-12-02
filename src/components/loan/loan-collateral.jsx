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


const LoanCollateral = (props) => {
    const [isLoading, setIsLoading] = useState(true)

    const [loan_collateralList, setloan_collateralList] = useState([]);
    const [formData, setFormData] = useState({
        ID: "",
        CustomerID: props.customer[0]?.CustomerID,
        ApplicationID: props.ApplicationID,
        GroupName: "",
        GroupAddress: "",
        GroupMemberName: "",
        Position: "",
        Email: "",
        Phone: "",
        Address: "",
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
            await axios.get(`${serverLink}loan/loan_applicant_group/list/${props.ApplicationID}`, props.token).then((res) => {
                if (res.data.length > 0) {
                    props.setLoanCollateral(res.data)
                    setloan_collateralList(res.data)
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
            if (formData.ID === "") {
                await axios.post(`${serverLink}loan/loan_applicant_group/add`, formData, props.token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        document.getElementById("collateral_close").click();
                        toast.success("Group member record added");
                    } else if (res.data.message === "exists") {
                        toast.error("This group member have been added already")
                    } else {
                        toast.error("network error")
                    }
                })
            } else {
                await axios.put(`${serverLink}loan/loan_applicant_group/update`, formData, props.token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        document.getElementById("collateral_close").click();
                        toast.success("Group member record Updated");
                    } else {
                        toast.error("network error")
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
            GroupName: "",
            GroupAddress: "",
            GroupMemberName: "",
            Position: "",
            Email: "",
            Phone: "",
            Address: "",
        })

    }

    return isLoading ? (<ComponentLoader />) : (
        <div className="col-12">
            <div className="card card-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-end">
                        <button data-bs-toggle="modal" disabled={btn.disabled} onClick={Reset} data-bs-target={"#loan_collateral-modal"} className="btn btn-md btn-primary">
                            Add Collateral
                        </button>
                    </div>
                    <div className="ratio ratio-16x9 mt-3">
                        <div className="table-responsive">
                            <table className="table table-vcenter table-hover card-table">
                                <thead>
                                    <tr>
                                        <th>Group Name</th>
                                        <th>Group Address</th>
                                        <th>Group Member</th>
                                        <th>Position</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Address</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loan_collateralList.length > 0 ?
                                            loan_collateralList.map((x, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{x.GroupName}</td>
                                                        <td>{x.GroupAddress}</td>
                                                        <td>{x.GroupMemberName} </td>
                                                        <td>{x.Position}</td>
                                                        <td>{x.Email}</td>
                                                        <td>{x.Phone}</td>
                                                        <td>{x.Address}</td>
                                                        <td>
                                                            <button disabled={btn.disabled} className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#loan_collateral-modal"
                                                                onClick={() => {
                                                                    setFormData({
                                                                        ...formData,
                                                                        ID: x.ID,
                                                                        ApplicationID: x.ApplicationID,
                                                                        CustomerID: props.customer[0]?.CustomerID,
                                                                        GroupName: x.GroupName,
                                                                        GroupAddress: x.GroupAddress,
                                                                        GroupMemberName: x.GroupMemberName,
                                                                        Position: x.Position,
                                                                        Email: x.Email,
                                                                        Phone: x.Phone,
                                                                        Address: x.Address,
                                                                        InsertedBy: props.loginData[0]?.StaffID,
                                                                    })
                                                                }}>
                                                                Edit
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr className="text-center">
                                                <td colSpan={7}>
                                                    <h3>
                                                        No Collateral Record
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
            <Modal id="loan_collateral-modal" title="Add Collateral for this Loan" close="collateral_close">
                <form onSubmit={onSubmit} >
                    <div className="col-md-6 col-xl-12">
                        <div className="mb-3">
                            <label className="form-label required">Group Name</label>
                            <input type="text" className="form-control" id="GroupName" value={formData.GroupName} onChange={onEdit} required placeholder="e.g Young Farmers Association" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Group Address</label>
                            <textarea type="text" rows={3} className="form-control" id="GroupAddress" value={formData.GroupAddress} onChange={onEdit} placeholder="e.g Office 5, Ladikpo market" ></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label required">Group Member Fullname</label>
                            <input type="text" className="form-control" id="GroupMemberName" value={formData.GroupMemberName} onChange={onEdit} required placeholder="e.g Musliu Ajoke" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label required">Position</label>
                            <input type="text" className="form-control" id="Position" value={formData.Position} onChange={onEdit} required placeholder="e.g Secretary" />
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label required">Email</label>
                                    <input type="email" className="form-control" id="Email" value={formData.Email} onChange={onEdit} required placeholder="Email" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label required">Phone</label>
                                    <input type="text" className="form-control" id="Phone" value={formData.Phone} onChange={onEdit} required placeholder="Phone" />
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label required">Occupation</label>
                            <input type="text" className="form-control" id="Occupation" value={formData.Occupation} onChange={onEdit} required placeholder="Occupation" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label required">Address</label>
                            <textarea type="text" rows={'5'} className="form-control" value={formData.Address} id="Address" onChange={onEdit} required placeholder="Address" >

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

    )
}
const mapStateToProps = (state) => {
    return {
        loginData: state.LoginDetails,
    };
};

export default connect(mapStateToProps, null)(LoanCollateral)
