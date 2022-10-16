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

const CustomerDetails = (props) => {
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
                    <div className="col d-flex flex-column">
                        <div className="card-body">
                            <h2 className="mb-4">Account</h2>
                            <h3 className="card-title">Profile Details</h3>

                            <div className="row">
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-6">

                                            {/* <div className="card-link" href="#">
                                                <div className="card-cover card-cover-blurred text-center" style={{
                                                    backgroundImage: `url(${formData.ImagePath === "" ?
                                                        zakat : `${serverLink}public/uploads/staff/${formData.ImagePath}`})`
                                                }} >
                                                    <span className="avatar avatar-xl avatar-thumb avatar-rounded" style={{
                                                        backgroundImage: `url(${formData.ImagePath === "" ?
                                                            zakat : `${serverLink}public/uploads/staff/${formData.ImagePath}`})`
                                                    }} ></span>
                                                </div>
                                                <div className="card-body text-center">
                                                    <div className="card-title mb-1">
                                                        Full Name
                                                    </div>
                                                    <div className="text-muted">
                                                        Customer type
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="col-auto">
                                                <span className="avatar avatar-xl"
                                                    style={{
                                                        backgroundImage: `url(${formData.ImagePath === "" ?
                                                            zakat : `${serverLink}public/uploads/staff/${formData.ImagePath}`})`
                                                    }} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <p className="h3">Company</p>
                                            <address>
                                                Street Address<br />
                                                State, City<br />
                                                Region, Postal Code<br />
                                                ltd@example.com
                                            </address>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 text-end">
                                    <p className="h3">Client</p>
                                    <address>
                                        Street Address<br />
                                        State, City<br />
                                        Region, Postal Code<br />
                                        ctr@example.com
                                    </address>
                                </div>
                                <div className="col-12 my-5">
                                    <h1>Invoice INV/001/15</h1>
                                </div>
                            </div>

                            <div className="card">
                                <ul className="nav nav-tabs" data-bs-toggle="tabs" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a href="#tabs-home-13" className="nav-link active" data-bs-toggle="tab" aria-selected="true" role="tab">Home</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a href="#tabs-profile-13" className="nav-link" data-bs-toggle="tab" aria-selected="false" tabIndex={-1} role="tab">Profile</a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="#">
                                                Action
                                            </a>
                                            <a className="dropdown-item" href="#">
                                                Another action
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="tab-pane active show" id="tabs-home-13" role="tabpanel">
                                            <div>Cursus turpis vestibulum, dui in pharetra vulputate id sed non turpis ultricies fringilla at sed facilisis lacus pellentesque purus nibh</div>
                                        </div>
                                        <div className="tab-pane" id="tabs-profile-13" role="tabpanel">
                                            <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container-xl">
                                <ul className="nav nav-bordered mb-4" data-bs-toggle="tabs" role="tablist">
                                    <li className="nav-item">
                                        <a href="#tabs-home-w" className="nav-link active" data-bs-toggle="tab" aria-selected="true" role="tab">Home</a>
                                        <a className="nav-link active" aria-current="page" href="#">View all</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#tabs-home-ww" className="nav-link" data-bs-toggle="tab" aria-selected="true" role="tab">Home</a>
                                        <a className="nav-link" href="#">Marketing</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Development</a>
                                    </li>
                                </ul>
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="tab-pane active show" id="tabs-home-w" role="tabpanel">
                                            <div>Cursus turpis vestibulum, dui in pharetra vulputate id sed non turpis ultricies fringilla at sed facilisis lacus pellentesque purus nibh</div>
                                        </div>
                                        <div className="tab-pane" id="tabs-profile-ww" role="tabpanel">
                                            <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6 col-lg">
                                        <h2 className="mb-3">To Do</h2>
                                        <div className="mb-4">
                                            <div className="row row-cards">
                                                <div className="col-12">
                                                    <div className="card card-sm">
                                                        <div className="card-body">
                                                            <h3 className="card-title">Enable analytics tracking</h3>
                                                            <div className="ratio ratio-16x9">
                                                                <img src="./static/projects/dashboard-1.png" className="rounded object-cover" alt="Enable analytics tracking" />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>





                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <span className="avatar avatar-xl"
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
                            </div>
                        </div>
                        <div className="card-footer bg-transparent mt-auto">
                            <div className="btn-list justify-content-end">
                                <button type="submit" onClick={onSubmit} className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
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

export default connect(mapStateToProps, null)(CustomerDetails)