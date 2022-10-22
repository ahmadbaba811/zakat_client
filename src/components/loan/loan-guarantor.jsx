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


const LoanGuarantor = (props) => {
    const [isLoading, setIsLoading] = useState(true)

    const [loan_guarantorList, setloan_guarantorList] = useState([]);
    const [formData, setFormData] = useState({
        ID: "",
        CustomerID: props.customer[0]?.CustomerID,
        ApplicationID: props.ApplicationID,
        FirstName: "",
        MiddleName: "",
        Surname: "",
        Email: "",
        Phone: "",
        Occupation: "",
        Address: "",
        InsertedBy: props.loginData[0]?.StaffID
    })

    const getData = async () => {
        try {
            await axios.get(`${serverLink}loan/loan_guarantor/list/${props.ApplicationID}`, props.token).then((res) => {
                if (res.data.length > 0) {
                    setloan_guarantorList(res.data)
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
                await axios.post(`${serverLink}loan/loan_guarantor/add`, formData, props.token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        document.getElementById("guarantor_close").click();
                        toast.success("Guarantor record added");
                    } else if (res.data.message === "exists") {
                        toast.error("This guarantor have been added already")
                    } else {
                        toast.error("network error")
                    }
                })
            } else {
                await axios.put(`${serverLink}loan/loan_guarantor/update`, formData, props.token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        document.getElementById("guarantor_close").click();
                        toast.success("Guarantor record Updated");
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
            FirstName: "",
            MiddleName: "",
            Surname: "",
            Email: "",
            Phone: "",
            Occupation: "",
            Address: "",
        })

    }

    return isLoading ? (<ComponentLoader />) : (
        <div className="col-12">
            <div className="card card-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-end">
                        <a data-bs-toggle="modal" onClick={Reset} data-bs-target={"#loan_guarantor-modal"} className="btn btn-md btn-primary">
                            Add Guarantor
                        </a>
                    </div>
                    <div className="ratio ratio-16x9 mt-3">
                        <div className="table-responsive">
                            <table className="table table-vcenter table-hover card-table">
                                <thead>
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Email Address</th>
                                        <th>Phone Number</th>
                                        <th>Occupation</th>
                                        <th>Address</th>
                                        <th>Inserted By</th>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loan_guarantorList.length > 0 ?
                                            loan_guarantorList.map((x, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{x.Surname} {x.MiddleName} {x.FirstName} </td>
                                                        <td>{x.Email}</td>
                                                        <td>{x.Phone}</td>
                                                        <td>{x.Occupation}</td>
                                                        <td>{x.Address}</td>
                                                        <td>{x.InsertedBy}</td>
                                                        <td>
                                                            <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#loan_guarantor-modal"
                                                                onClick={() => {
                                                                    setFormData({
                                                                        ...formData,
                                                                        ID: x.ID,
                                                                        ApplicationID: x.ApplicationID,
                                                                        CustomerID: props.customer[0]?.CustomerID,
                                                                        FirstName: x.FirstName,
                                                                        MiddleName: x.MiddleName,
                                                                        Surname: x.Surname,
                                                                        Email: x.Email,
                                                                        Phone: x.Phone,
                                                                        Occupation: x.Occupation,
                                                                        Address: x.Address,
                                                                        InsertedBy: props.loginData[0].StaffID,
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
                                                        No Guarantor Record
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
            <Modal id="loan_guarantor-modal" title="Add Guarantor for this Loan" close="guarantor_close">
                <form onSubmit={onSubmit} >
                    <div className="col-md-6 col-xl-12">
                        <div className="mb-3">
                            <label className="form-label required">First Name</label>
                            <input type="text" className="form-control" id="FirstName" value={formData.FirstName} onChange={onEdit} required placeholder="First Name" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Middle Name</label>
                            <input type="text" className="form-control" id="MiddleName" value={formData.MiddleName} onChange={onEdit} placeholder="Middle Name" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label required">Surname</label>
                            <input type="text" className="form-control" id="Surname" value={formData.Surname} onChange={onEdit} required placeholder="Surname" />
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

export default connect(mapStateToProps, null)(LoanGuarantor)
