import axios from "axios";
import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { setLoginDetails } from "../../action/action";
import Loader from "../common/loader";
import { serverLink } from '../../constants/url'
import { useEffect } from "react";
import Modal from "../common/modal/modal";
import ReportTable from "../common/table/report_table";
import { toast } from "react-toastify";
import { NetworkErrorAlert } from "../common/sweetalert/sweetalert";
import { PageHeader } from "../common/pageHeader";
import { Link } from "react-router-dom";
import zakat from '../../images/zakat.jpg'
import { nigerianStates } from 'nigerian-states-and-lgas';
import { Audit, formatDate } from "../../constants/constants";


const CustomersList = (props) => {
    const token = props.loginData[0].token;

    const [isLoading, setIsLoading] = useState(true);
    const columns = ["SN", "CustomerID", "Full Name", "Email", "Phone", "Gender", "Status", "Passport", "Action"];
    const [data, setData] = useState([]);
    const [customerList, setcustomerList] = useState([]);

    const statesLga = nigerianStates.all()
    const [imageSrc, setimageSrc] = useState({
        Passport: ""
    })
    const [img, setImg] = useState('')
    const [lgaList, setLgaList] = useState([]);

    const [formData, setFormData] = useState({
        ID: "",
        CustomerID: "",
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
        Status: 1,
        Passport: "",
        DateOfBirth: "",
        Gender: "",
        Bvn: "",
        Branch: props.loginData[0].Branch
    })


    const getData = async () => {
        try {
            await axios.get(`${serverLink}customer/customer/list`, token).then((res) => {
                if (res.data.length > 0) {
                    let rows = [];
                    res.data.map((x, i) => {
                        rows.push([
                            i + 1,
                            x.CustomerID,
                            <Link to={`/customer/${x.CustomerID}`} >{x.FirstName + " " + x.MiddleName + " " + x.Surname}</Link>,
                            x.Email,
                            x.Phone,
                            <label className={x.Gender === "Male" ? "badge bg-success" : "badge bg-info"}>
                                {x.Gender}
                            </label>,
                            <label className={x.Status === 1 ? "badge bg-success" : "badge bg-danger"}>
                                {x.Status === 1 ? "Active" : "InActive"}
                            </label>,
                            <img
                                src={
                                    x.Passport === "" ? zakat : `${serverLink}public/uploads/customer/${x.Passport}`
                                }
                                style={{ maxWidth: '60px' }} />,
                            (<button className="btn btn-sm btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-large"
                                onClick={() => {
                                    setLgaList(statesLga.filter(j => j.state === x.StateOfOrigin)[0].lgas);
                                    setImg(x.Passport)
                                    setFormData({
                                        ...formData,
                                        ID: x.ID,
                                        CustomerID: x.CustomerID,
                                        FirstName: x.FirstName,
                                        MiddleName: x.MiddleName,
                                        Surname: x.Surname,
                                        Email: x.Email,
                                        Phone: x.Phone,
                                        Bvn: x.Bvn,
                                        StateOfOrigin: x.StateOfOrigin,
                                        Lga: x.Lga,
                                        City: x.City,
                                        Address: x.Address,
                                        LandMark: x.LandMark,
                                        DateOfBirth: formatDate(x.DateOfBirth),
                                        Gender: x.Gender,
                                        Bvn: x.Bvn,
                                    })
                                    setimageSrc({
                                        ...imageSrc,
                                        Passport: x.Passport,
                                    })

                                }}
                            >
                                Edit

                            </button>
                            )

                        ])
                    })
                    setData(rows)
                }
                setIsLoading(false);
            })
        } catch (e) {
            console.log(e)
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
        setimageSrc({
            ...imageSrc,
            Passport: URL.createObjectURL(e.target.files[0])
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if (formData.Passport !== "") {
            if (!formData.Passport.type.includes("image/")) {
                toast.error("Only images file is allowed");
                return false;
            }
            if (parseInt(formData.Passport.size) / 1000 > 200) {
                toast.error("image size cannot be more than 200kb");
                return false;
            }
        }

        try {
            if (formData.ID === "") {
                await axios.post(`${serverLink}customer/personal_info/add`, formData, token).then((res) => {
                    if (res.data.message === "success") {
                        const dt = new FormData();
                        dt.append("File", formData.Passport);
                        dt.append("CustomerID", formData.CustomerID);
                        if (formData.Passport !== "") {
                            axios.post(`${serverLink}customer/customer_photo`, dt, token).then((res) => { })
                        }
                        getData();
                        Audit(`New Customer with ID ${formData.CustomerID} Added in ${formData.Branch} Branch`, formData.Branch, formData.InsertedBy, token)
                        document.getElementById("Close").click();
                        toast.success("Customer Added Successfully");
                        Reset()
                    }
                    else if (res.data.message === "exist") {
                        toast.error("Email or phone number already exists");
                    }
                    else {
                        document.getElementById("Close").click();
                        toast.error("something went wrong, please try again");
                    }
                })
            } else {
                await axios.post(`${serverLink}customer/personal_info/update`, formData, token).then((res) => {
                    if (res.data.message === "success") {
                        const dt = new FormData();
                        dt.append("File", formData.Passport);
                        dt.append("CustomerID", formData.CustomerID);

                        if (formData.Passport !== "") {
                            axios.post(`${serverLink}customer/customer_photo`, dt, token).then((res) => { })
                        }
                        getData();
                        Audit(`Customer with ID ${formData.CustomerID} Recorded Updated by ${formData.InsertedBy}`, formData.Branch, formData.InsertedBy, token)
                        document.getElementById("Close").click();
                        toast.success("Customer record updated Successfully");
                        Reset()
                    } else {
                        document.getElementById("Close").click();
                        toast.error("something went wrong, please try again");
                    }
                })
            }
        } catch (e) {
            NetworkErrorAlert();
        }

    }

    const Reset = () => {
        setFormData({
            ...formData,
            ID: "",
            CustomerID: "",
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
            Status: 1,
            Passport: "",
            DateOfBirth: "",
            Gender: "",
            Bvn: "",
            Branch: props.loginData[0].Branch
        })
    }


    return isLoading ? (<Loader />) : (
        <div className="page-wrapper">
            <PageHeader Reset={Reset} target="modal-large" title={["KYC", "Customer", "Customer List"]} btntext={"Add Customer"} />

            <div className="page-body">
                <div className="container-xl">
                    <div className="row row-deck row-cards">
                        <ReportTable columns={columns} data={data} />
                    </div>
                </div>
            </div>

            <Modal title="Add/Edit Customer Info" size="modal-full-width" >
                <form onSubmit={onSubmit}>
                    <div className="row">

                        <div className="col-md-9">
                            <div className="row">
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
                                        <input type={"number"}   autoComplete="off" disabled={formData.ID !== "" ? true : false} maxLength={11} required className="form-control" id="Bvn" onChange={onEdit} value={formData.Bvn} />
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
                        </div>

                        <div className="col-md-3">
                            <label className="d-flex justify-content-center text-danger">
                                <small>
                                    <strong><i>File must not be more than 200kb</i></strong>
                                </small>
                            </label>
                            <div className="d-flex justify-content-center mb-3 pb-3">
                                <span className="border border-4"  >
                                    <label className="cursor cursor-pointer">
                                        <img style={{ borderRadius: '5px', padding: '5px' }} src={
                                            img === "" ?
                                                imageSrc.Passport === "" ? zakat
                                                    : imageSrc.Passport
                                                : `${serverLink}public/uploads/customer/${img}`
                                        } alt="staff image" width={"150px"} />
                                    </label>

                                </span>
                            </div>
                            <div className="d-flex justify-content-center mb-3 pb-3">
                                <span>
                                    <label className="form-label required">Passport</label>
                                    <input type={"file"} accept="image/*" id="Passport" onChange={onImageEdit} className="w-100" />
                                </span>
                            </div>

                        </div>
                    </div>
                    <div className="mb-3 mt-3">
                        <button className="btn btn-md btn-primary w-100" type="submit">Submit</button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        setOnLoginDetails: (p) => {
            dispatch(setLoginDetails(p));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersList);
