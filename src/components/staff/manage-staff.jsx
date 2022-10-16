import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setBranchList, setLoginDetails } from "../../action/action";
import { serverLink } from "../../constants/url";
import Loader from "../common/loader";
import { PageHeader } from "../common/pageHeader";
import { NetworkErrorAlert } from "../common/sweetalert/sweetalert";
import { nigerianStates } from 'nigerian-states-and-lgas';
import { toast } from "react-toastify";
import zakat from '../../images/zakat.jpg'
import { Audit } from "../../constants/constants";



const ManageStaff = (props) => {
    const navigate = useNavigate();
    const statesLga = nigerianStates.all()
    const token = props.loginData[0].token
    const params = useLocation();
    let _id_ = params.search !== "" ? params.search.split("=")[1] : '';
    const [isLoading, setIsLoading] = useState(true);
    const [branhcList, setBranchList] = useState(props.branch_list);
    const [departmentList, setDepartmentList] = useState(props.department_list)
    const [designationList, setDesignationList] = useState(props.designation_list);
    const [lgaList, setLgaList] = useState([]);
    const [imageSrc, setsetImageSrc] = useState({
        Passport: ""
    })
    const [img, setImg] = useState('')
    const [formData, setFormData] = useState({
        ID: "",
        StaffID: "", Branch: "", Designation: "", Department: "", Email: "",
        Phone: "", FirstName: "", MiddleName: "", Surname: "", Gender: "",
        HighestQualification: "", ImagePath: "", IsActive: "", StateOfOrigin: "",
        Lga: "", MaritalStatus: "", Religion: "", Role: "", DateOfBirth: "", Address: "",
        Password: "", ImagePath: "", InsertedBy: props.loginData[0].StaffID,
    })

    const getData = async () => {

        try {
            await axios.get(`${serverLink}staff/last_staff_id`, token).then((response) => {
                if (_id_ === "") {
                    if (response.data.length > 0) {
                        const lastId = response.data[0].StaffID;
                        const indexOfId = lastId.split("ZK")[1];
                        const lastIndex = Number(indexOfId) + 1;
                        const padStaffID = (lastIndex, places) =>
                            String(lastIndex).padStart(places, "0");
                        const newStaffId = `ZK${padStaffID(lastIndex, 4)}`;
                        setFormData({
                            ...formData,
                            StaffID: newStaffId
                        })
                        setTimeout(() => {

                        }, 500);
                    }
                }
            }).then(async () => {
                if (_id_ !== "") {
                    await axios.get(`${serverLink}staff/staff_list/${_id_}`, token).then((res) => {
                        if (res.data.length > 0) {
                            let filtered = statesLga.filter(x => x.state === res.data[0].StateOfOrigin);
                            setTimeout(() => {
                                setLgaList(filtered.length > 0 ? filtered[0].lgas : []);
                                setFormData(...res.data);
                                setImg(res.data[0].ImagePath)
                                setIsLoading(false)
                            }, 200);
                        }
                    })

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

    const onImageEdit = (e) => {
        if (!e.target.files[0].type.includes("image/")) {
            toast.error("Only images file is allowed");
            return false;
        }
        if (parseInt(e.target.files[0].size) / 1000 > 200) {
            toast.error("image size cannot be more than 200kb");
            return false;
        }
        setImg('')
        setFormData({
            ...formData,
            [e.target.id]: e.target.files[0]
        })
        setsetImageSrc({
            ...imageSrc,
            Passport: URL.createObjectURL(e.target.files[0])
        })
    }

    const submitStaff = async (e) => {
        e.preventDefault();
        try {
            if (formData.ID === "") {
                await axios.post(`${serverLink}staff/add_staff`, formData, token).then(async (res) => {
                    if (res.data.message === "success") {
                        Audit(
                            `new staff with id ${formData.StaffID} added`,
                            props.loginData[0].Branch,
                            props.loginData[0].StaffID,
                            token
                        )
                        if (formData.ImagePath !== "") {
                            const dt = new FormData();
                            dt.append("File", formData.ImagePath);
                            dt.append("StaffID", formData.StaffID);
                            await axios.post(`${serverLink}staff/staff_photo`, dt, token).then((res) => {

                            })
                        }
                        toast.success("staff added successfully");
                        setTimeout(() => {
                            Reset();
                        }, 500);
                    } else if (res.data.message === "exist") {
                        toast.error('staff with email or phone already exist');
                    } else {
                        NetworkErrorAlert();
                    }
                })
            } else {
                await axios.put(`${serverLink}staff/update_staff`, formData, token).then(async (res) => {
                    if (res.data.message === "success") {
                        toast.success("staff updated successfully");
                        if (imageSrc.Passport !== "") {
                            const dt = new FormData();
                            dt.append("File", formData.ImagePath);
                            dt.append("StaffID", formData.StaffID);
                            await axios.post(`${serverLink}staff/staff_photo`, dt, token).then((res) => {

                            })
                        }
                        setTimeout(() => {
                            Reset();
                        }, 500);
                    } else {
                        NetworkErrorAlert();
                    }
                })
            }
        } catch (e) {
            console.log(e)
            NetworkErrorAlert();
        }
    }

    const Reset = () => {
        navigate('/staff-list')
    }

    return isLoading ? (<Loader />) : (
        <div className="page-wrapper">
            <PageHeader Reset={Reset} title={["Staff", "Manage Staff", "Add/Edit staff"]} />

            <div className="page-body">
                <div className="container-xl">
                    <div className="row">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Staff Details</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitStaff}>
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
                                                <label className="form-label required">Branch</label>
                                                <select id="Branch" required className="form-control form-select" onChange={onEdit} value={formData.Branch}>
                                                    <option value={""}>-select branch-</option>
                                                    {
                                                        branhcList.length > 0 &&
                                                        branhcList.map((x, i) => {
                                                            return (
                                                                <option key={i} value={x.BranchCode} >{x.BranchName}</option>
                                                            )
                                                        })
                                                    }

                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label required">Designation</label>
                                                <select id="Designation" required className="form-control form-select" onChange={onEdit} value={formData.Designation}>
                                                    <option value={""} defaultValue >-select designation-</option>
                                                    {
                                                        designationList.length > 0 &&
                                                        designationList.map((x, i) => {
                                                            return (
                                                                <option key={i} value={x.DesignationCode} >{x.DesignationName}</option>
                                                            )
                                                        })
                                                    }

                                                </select>
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
                                                <label className="form-label required">Marital Status</label>
                                                <select id="MaritalStatus" required className="form-control form-select" onChange={onEdit} value={formData.MaritalStatus}>
                                                    <option value={""}>-select marital status-</option>
                                                    <option value={"Single"}>Single</option>
                                                    <option value={"Married"}>Married</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label required">Religion</label>
                                                <select id="Religion" required className="form-control form-select" onChange={onEdit} value={formData.Religion}>
                                                    <option value={""}>-select religion-</option>
                                                    <option value={"Islam"}>Islam</option>
                                                    <option value={"Christianity"}>Christianity</option>
                                                </select>
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

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label required">Highest Qualification</label>
                                                <input type={"text"} required className="form-control" id="HighestQualification" onChange={onEdit} value={formData.HighestQualification} />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <div className="form-label required">Department</div>
                                                <select className="form-select" required id="Department" onChange={onEdit} value={formData.Department}>
                                                    <option value={""}>-select department-</option>
                                                    {
                                                        departmentList.length > 0 &&
                                                        departmentList.map((x, i) => {
                                                            return (
                                                                <option key={i} value={x.DepartmentCode} >{x.DepartmentName}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <div className="form-label required">Status</div>
                                                <select className="form-select" required id="IsActive" onChange={onEdit} value={formData.IsActive}>
                                                    <option value={""}>-select status-</option>
                                                    <option value={1} >Active</option>
                                                    <option value={0} >InActive</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="mb-3">
                                                <div className="form-label required">Adress</div>
                                                <textarea className="form-control" id="Address" onChange={onEdit} value={formData.Address} rows="5" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <button className="btn btn-md btn-primary w-100" type="submit">Submit</button>
                                    </div>
                                </form>
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
        branch_list: state.branch_list,
        designation_list: state.designation_list,
        department_list: state.department_list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setOnLoginDetails: (p) => {
            dispatch(setLoginDetails(p));
        },
        setOnBranchList: (p) => {
            dispatch(setBranchList(p));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaff)