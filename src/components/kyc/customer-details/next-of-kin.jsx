import { Token } from "@mui/icons-material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { currencyConverter, formatDate, formatDateAndTime } from "../../../constants/constants";
import { serverLink } from "../../../constants/url";
import ComponentLoader from "../../common/modal/component-loader";
import Modal from "../../common/modal/modal";
import { NetworkErrorAlert } from "../../common/sweetalert/sweetalert";


const CustomerNextOfKin = (props) => {
    const token = props.loginData[0].token
    const [NextOfKin, setNextOfKin] = useState([]);
    const [NextOfKin2, setNextOfKin2] = useState([]);

    const [formData, setFormData] = useState({
        ID: "",
        CustomerID: props.customer[0].CustomerID,
        FirstName: "",
        MiddleName: "",
        Surname: "",
        Email: "",
        Phone: "",
        Relationship: "",
        Occupation: "",
        Address: "",
        InsertedBy: props.loginData[0].StaffID,
    })

    const getData = async () => {
        try {
            await axios.get(`${serverLink}customer/nex_of_kin/list/${props.customer[0]?.CustomerID}`, token).then((res) => {
                if (res.data.length > 0) {
                    setNextOfKin(res.data);
                    setNextOfKin2(res.data)
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
        let filtered = NextOfKin2.length > 0 &&
            NextOfKin2.filter(x => x.LoanType.toLowerCase().includes(e.target.valuetoLowerCase())) ||
            NextOfKin2.filter(x => formatDateAndTime(x.DueDateLast, "date_and_time").includes(e.target.value)) ||
            NextOfKin2.filter(x => x.LoanDuration.includes(e.target.value))
        setNextOfKin(filtered)
    }
    const onEdit = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.ID === "") {
                await axios.post(`${serverLink}customer/nex_of_kin/add`, formData, token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        Reset();
                        document.getElementById("Close").click();
                        toast.success("Next of Kin Added")
                    } else {
                        toast.error('please try again...')
                    }
                })
            } else {
                await axios.put(`${serverLink}customer/nex_of_kin/update`, formData, token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        Reset();
                        document.getElementById("Close").click();
                        toast.success("Next of Kin Added")
                    } else {
                        toast.error('please try again...')
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
            ID: "",
            CustomerID: props.customer[0].CustomerID,
            FirstName: "",
            MiddleName: "",
            Surname: "",
            Email: "",
            Phone: "",
            Relationship: "",
            Occupation: "",
            Address: "",
            InsertedBy: props.loginData[0].StaffID,
        })
    }
    return props.customer.length === 0 ? (<ComponentLoader />) : (

        <div className="col-12">
            <div className="card card-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h3 className="card-title">Next of Kin</h3>
                        <div>
                            <input className="form-control" placeholder="search" onChange={onSearch} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <a data-bs-toggle="modal" onClick={Reset} data-bs-target={"#nok-modal"} className="btn btn-md btn-primary">
                            Add Next of Kin
                        </a>
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
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        NextOfKin.length > 0 ?
                                            NextOfKin.map((x, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{x.Surname} {x.MiddleName} {x.FirstName} </td>
                                                        <td>{x.Email}</td>
                                                        <td>{x.Phone}</td>
                                                        <td>{x.Relationship}</td>
                                                        <td>{x.Occupation}</td>
                                                        <td>{x.Address}</td>
                                                        <td>{x.InsertedBy}</td>
                                                        <td>
                                                            <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#nok-modal"
                                                            onClick={() => {
                                                                setFormData({
                                                                    ...formData,
                                                                    ID: x.ID,
                                                                    CustomerID: props.customer[0].CustomerID,
                                                                    FirstName: x.FirstName,
                                                                    MiddleName: x.MiddleName,
                                                                    Surname: x.Surname,
                                                                    Email: x.Email,
                                                                    Phone: x.Phone,
                                                                    Relationship: x.Relationship,
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
                                                        No NOK Record
                                                    </h3>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal id="nok-modal" title="Add/Edit NOK">
                        <form onSubmit={onSubmit} >
                            <div className="col-md-6 col-xl-12">
                                <div className="mb-3">
                                    <label className="form-label required">First Name</label>
                                    <input type="text" className="form-control" id="FirstName" value={formData.FirstName} onChange={onEdit} required placeholder="First Name" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label required">Middle Name</label>
                                    <input type="text" className="form-control" id="MiddleName" value={formData.MiddleName} onChange={onEdit} required placeholder="Middle Name" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label required">Surname</label>
                                    <input type="text" className="form-control" id="Surname" value={formData.Surname} onChange={onEdit} required placeholder="Surname" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label required">Email</label>
                                    <input type="email" className="form-control" id="Email" value={formData.Email} onChange={onEdit} required placeholder="Email" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label required">Phone</label>
                                    <input type="text" className="form-control" id="Phone" value={formData.Phone} onChange={onEdit} required placeholder="Phone" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label required" >Relationship</label>
                                    <select className="form-control form-select" onChange={onEdit} value={formData.Relationship} required id="Relationship">
                                        <option value={""}>-select relationship- </option>
                                        <option value={"Father"}>Father</option>
                                        <option value={"Mother"}>Mother</option>
                                        <option value={"Brother"}>Brother</option>
                                        <option value={"Sister"}>Sister</option>
                                        <option value={"Uncle"}>Uncle</option>
                                        <option value={"Aunty"}>Aunty</option>
                                    </select>
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

export default connect(mapStateToProps, null)(CustomerNextOfKin)
