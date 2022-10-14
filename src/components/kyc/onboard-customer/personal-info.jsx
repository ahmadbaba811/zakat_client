import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { serverLink } from "../../../constants/url";
import { nigerianStates } from 'nigerian-states-and-lgas';
import { toast } from "react-toastify";
import zakat from '../../../images/zakat.jpg'
import axios from "axios";
import { NetworkErrorAlert } from "../../common/sweetalert/sweetalert";

const PersonalInfo = (props) => {
    const statesLga = nigerianStates.all()
    const token = props.loginData[0].token
    const [imageSrc, setimageSrc] = useState({
        Passport: ""
    })
    const [img, setImg] = useState('')
    const [lgaList, setLgaList] = useState([]);

    const [formData, setFormData] = useState({
        EntryID: "",
        CustomerID: props.CustomerID,
        FirstName: "",
        MiddleName: "",
        Surname: "",
        Email: "",
        Phone: "",
        Bvn: "",
        BvnStatus: "",
        StateOfOrigin: "",
        Lga: "",
        City: "",
        Address: "",
        LandMark: "",
        InsertedBy: props.loginData[0].StaffID,
        Status: "",
        Passport: "",
        DateOfBirth: "",
        Gender: "",
        Bvn: ""
    })

    const getData =()=>{

    }
    const onEdit = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
        if (e.target.id === "StateOfOrigin") {
            let filtered = statesLga.filter(x => x.state === e.target.value);
            setLgaList(filtered.length > 0 ? filtered[0].lgas : []);
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
    }
    const onImageEdit = () => {

    }

    const submitPersonalIndo = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${serverLink}customer/personal_info/add`, formData, token).then((res) => {
                if (res.data.message === "success") {
                    props.setEnabledNav1();
                    toast.success("personal information Added Successfully")
                } else {
                    toast.error("something went wrong, please try again");
                }
            })
        } catch (e) {
            NetworkErrorAlert();
        }

    }

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={submitPersonalIndo}>
                    <div className="row">
                        <div className="col-md-12">
                            <label className="d-flex justify-content-center justify-content-evenly text-danger">
                                <small>
                                    <strong><i>File must not be more than 200kb</i></strong>
                                </small>
                            </label>
                            <div className="d-flex justify-content-center justify-content-evenly mb-3 pb-3">
                                <span className="border border-4"  >
                                    <label className="cursor cursor-pointer">
                                        <img style={{ borderRadius: '5px', padding: '5px' }} src={
                                            img === "" ?
                                                imageSrc.Passport === "" ? zakat
                                                    : imageSrc.Passport
                                                : `${serverLink}public/uploads/staff/${formData.ImagePath}`
                                        } alt="staff image" width={"150px"} />
                                        <span> <input type={"file"} accept="image/*" id="ImagePath" onChange={onImageEdit} style={{ display: 'none' }} className="w-100" /></span>
                                    </label>

                                </span>

                            </div>

                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label required">First Name</label>
                                <input type={"text"} required className="form-control" id="FirstName" onChange={onEdit} value={formData.FirstName} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Middle Name</label>
                                <input type={"text"} className="form-control" id="MiddleName" onChange={onEdit} value={formData.MiddleName} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label required">Surname</label>
                                <input type={"text"} required className="form-control" id="Surname" onChange={onEdit} value={formData.Surname} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label required">Email Address</label>
                                <input type={"email"} required className="form-control" id="Email" onChange={onEdit} value={formData.Email} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label required">Phone Number</label>
                                <input type={"text"} required className="form-control" id="Phone" onChange={onEdit} value={formData.Phone} />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label required">BVN</label>
                                <input type={"number"} maxLength={11} required className="form-control" id="Bvn" onChange={onEdit} value={formData.Bvn} />
                            </div>
                        </div>


                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label required">Gender</label>
                                <select id="Gender" required className="form-control form-select" onChange={onEdit} value={formData.Gender}>
                                    <option value={""}>-select gender-</option>
                                    <option value={"Male"}>Male</option>
                                    <option value={"Female"}>Female</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label required">Date Of Birth</label>
                                <input id="DateOfBirth" type={"date"} required className="form-control form-select" onChange={onEdit} value={formData.DateOfBirth} />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="mb-3">
                                <div className="form-label required">State of Origin</div>
                                <select className="form-select" id="StateOfOrigin" required onChange={onEdit} value={formData.StateOfOrigin} >
                                    <option value={""}>-select state-</option>
                                    {
                                        statesLga.length > 0 &&
                                        statesLga.map((x, i) => {
                                            return (
                                                <option key={i} value={x.state} >{x.state}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <div className="form-label required">LGA</div>
                                <select className="form-select" required id="Lga" onChange={onEdit} value={formData.Lga}>
                                    <option value={""}>-select lga-</option>
                                    {
                                        lgaList.length > 0 &&
                                        lgaList.map((x, i) => {
                                            return (
                                                <option key={i} value={x} >{x}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="mb-3">
                                <label className="form-label required">City/Town</label>
                                <input type={"text"} required className="form-control" id="City" onChange={onEdit} value={formData.City} />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="mb-3">
                                <div className="form-label required">Adress</div>
                                <textarea className="form-control" id="Address" onChange={onEdit} value={formData.Address} rows="5" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label required">Closest Landmark</label>
                                <input type={"text"} required className="form-control" id="LandMark" onChange={onEdit} value={formData.LandMark} />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 mt-3">
                        <button className="btn btn-md btn-primary w-100" type="submit">Submit</button>
                    </div>
                </form>
            </div>

        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        loginData: state.LoginDetails,
        branch_list: state.branch_list

    };
};

export default connect(mapStateToProps, null)(PersonalInfo);
