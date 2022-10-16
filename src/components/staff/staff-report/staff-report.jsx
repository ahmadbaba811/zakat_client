import axios from "axios";
import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { decryptData, encryptData } from "../../../constants/constants";
import { serverLink } from "../../../constants/url";
import zakat from '../../../images/zakat.jpg'
import Loader from "../../common/loader";
import { NetworkErrorAlert, showAlert } from "../../common/sweetalert/sweetalert";
import StaffActivities from "./activities";
import LoginHistory from "./login-history";



const StafffReport = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const token = props.loginData[0].token
    const [active, setisActive] = useState(false);
    const [details, setDetails] = useState(props.staff_details)

    const ChangeActive = (e) => {

    }
    const [formData, setFormData] = useState({
        FirstName: details.FirstName === "" ? "" : details.FirstName,
        MiddleName: details.MiddleName === "" ? "" : details.MiddleName,
        Surname: details.Surname === "" ? "" : details.Surname,
        StaffID: details.StaffID === "" ? "" : details.StaffID,
        Email: details.Email === "" ? "" : details.Email,
        ImagePath: details.ImagePath === "" ? "" : details.ImagePath,
        IsActive: details.IsActive === "" ? 0 : details.IsActive,
        oPassword: details.Password === "" ? "" : details.Password,
        Password: "",
        nPassword: "",
        cPassword: ""
    })

    const onEdit = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const onIsactiveToggle = (e) => {
        let status;
        if (e.target.checked === true) {
            status = 1
        } else {
            status = 0
        }
        try {
            axios.put(`${serverLink}staff/update_profile_status`, { IsActive: status, StaffID: formData.StaffID }, token).then((res) => {
                if (res.data.message === 'success') {
                    setFormData({
                        ...formData,
                        IsActive: status
                    })
                    toast.success('Account Status updated')
                } else {
                    toast.error("please try again...")
                }
            })
        } catch (e) {
            console.log(e)
            NetworkErrorAlert();
        }
    }

    const onImageUpdate = async (e) => {
        if (!e.target.files[0].type.includes("image/")) {
            toast.error("Only images file is allowed");
            return false;
        }
        if (parseInt(e.target.files[0].size) / 1000 > 200) {
            toast.error("image size cannot be more than 200kb");
            return false;
        }

        setIsLoading(true)
        const dt = new FormData();
        dt.append("File", e.target.files[0]);
        dt.append("StaffID", formData.StaffID);
        await axios.post(`${serverLink}staff/staff_photo`, dt, token).then((res) => {
            if (res.data.message === "success") {
                toast.success('passport updated successfully...');
                setTimeout(() => {
                    setFormData({
                        ...formData,
                        ImagePath: res.data.path
                    })
                }, 200);
                setIsLoading(false)
            }
            setIsLoading(false)
        })
    }

    const onSubmit = async () => {
        if (formData.Password === "" || formData.nPassword === "" || formData.cPassword === "") {
            toast.error("Please enter password...")
            return false;
        }
        if (decryptData(formData.oPassword) !== formData.Password) {
            toast.error("Old Password incorrect...")
            return false;
        }
        if (formData.nPassword !== formData.cPassword) {
            toast.error("Please do not match...")
            return false;
        }
        try {
            try {
                const senData = {
                    Password: encryptData(formData.cPassword),
                    StaffID: formData.StaffID
                }
                await axios.put(`${serverLink}staff/update_password`, senData, token).then((res) => {
                    if (res.data.message === "success") {
                        setFormData({
                            ...formData,
                            nPassword: "",
                            cPassword: "",
                            Password: "",
                        })
                        showAlert("Success", "Your Password have been changed successfully, use it when next you login", "success")
                    } else {
                        toast.error("please try again...")
                    }
                })
            } catch (e) {
                NetworkErrorAlert();
            }

        } catch (error) {

        }
    }

    return isLoading ? (<Loader />) : (
        <div className="page-body">
            <div className="container-xl">
                <div className="card">
                    <div className="row g-0">
                        <div className="col-3 d-none d-md-block border-end">
                            <div className="card-body">
                                <h4 className="subheader">Settings</h4>
                                <div className="list-group list-group-transparent">
                                    <span
                                        onClick={ChangeActive}
                                        accessKey={'account-settings'}
                                        value={'account-settings'}
                                        className={`list-group-item list-group-item-action d-flex align-items-center cursor-pointer active`}>
                                        Account Settings
                                    </span>
                                </div>
                                <h4 className="subheader mt-4">Experience</h4>
                                <div className="list-group list-group-transparent">
                                    <span
                                        className={`list-group-item list-group-item-action d-flex align-items-center cursor-pointer`}>
                                        Login History
                                    </span>
                                    <span
                                        className={`list-group-item list-group-item-action d-flex align-items-center cursor-pointer`}>
                                        Activities Track
                                    </span>
                                    <span
                                        className={`list-group-item list-group-item-action d-flex align-items-center cursor-pointer`}>
                                        Staff performace
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col d-flex flex-column">
                            <div className="card-body">
                                <h2 className="mb-4">Account</h2>
                                <h3 className="card-title">Profile Details</h3>
                                <div className="row align-items-center">
                                    <div className="col-auto"><span className="avatar avatar-xl"
                                        style={{
                                            backgroundImage: `url(${formData.ImagePath === "" ?
                                                zakat : `${serverLink}public/uploads/staff/${formData.ImagePath}`})`
                                        }} />
                                    </div>
                                    <div className="col-auto">
                                        <input type={"file"} className="btn" onChange={onImageUpdate} />
                                    </div>
                                </div>
                                <h3 className="card-title mt-4">Business Profile</h3>
                                <div className="row g-3">
                                    <div className="col-md">
                                        <div className="form-label">First Name</div>
                                        <input type="text" disabled onChange={onEdit} id="FirstName"
                                            className="form-control" value={formData.FirstName} />
                                    </div>
                                    <div className="col-md">
                                        <div className="form-label">Middle Name</div>
                                        <input type="text" disabled onChange={onEdit} id="MiddleName"
                                            className="form-control" value={formData.MiddleName} />
                                    </div>
                                    <div className="col-md">
                                        <div className="form-label">Surname Name</div>
                                        <input type="text" disabled onChange={onEdit} id="Surname"
                                            className="form-control" value={formData.Surname} />
                                    </div>


                                </div>
                                <h3 className="card-title mt-4">Email</h3>
                                <p className="card-subtitle">This contact will be shown to others publicly.</p>
                                <div>
                                    <div className="">
                                        <div className="col-auto">
                                            <input type="text" disabled className="form-control" onChange={onEdit} value={formData.Email} />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="card-title mt-4">Password</h3>
                                <p className="card-subtitle">Reset password by entering same values twice in the fields provided</p>
                                <div className="row g-3">
                                    <div className="col-md">
                                        <div className="form-label">Old Password</div>
                                        <input type="text" onChange={onEdit} id="Password"
                                            className="form-control" value={formData.Password} />
                                    </div>
                                    <div className="col-md">
                                        <div className="form-label">New Password</div>
                                        <input type="text" onChange={onEdit} id="nPassword"
                                            className="form-control" value={formData.nPassword} />
                                    </div>
                                    <div className="col-md">
                                        <div className="form-label">Confirm New Password</div>
                                        <input type="text" onChange={onEdit} id="cPassword"
                                            className="form-control" value={formData.cPassword} />
                                    </div>
                                    <div className="card-footer bg-transparent mt-auto">
                                        <div className="btn-list justify-content-end">
                                            <button type="submit" onClick={onSubmit} className="btn btn-primary">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="card-title mt-4">Profile Status</h3>
                                <p className="card-subtitle">Activate or Deactive your Account</p>
                                <div>
                                    <label className="form-check form-switch form-switch-lg">
                                        <input defaultChecked={formData.IsActive === 1 ? true : false} onChange={onIsactiveToggle} className="form-check-input" type="checkbox" />
                                        <span className="form-check-label form-check-label-on">You're currently active</span>
                                        <span className="form-check-label form-check-label-off">You're
                                            currently inactive</span>
                                    </label>
                                </div>
                            </div>



                            <StaffActivities />

                            <LoginHistory />
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
        designation_list: state.designation_list,
        staff_details: state.staff_details
    };
};

export default connect(mapStateToProps, null)(StafffReport)