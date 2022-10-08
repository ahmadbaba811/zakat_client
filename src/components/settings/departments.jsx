import axios from "axios";
import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { setLoginDetails } from "../../action/action";
import Loader from "../common/loader";
import { serverLink, serverStatus } from '../../constants/url'
import { useEffect } from "react";
import Modal from "../common/modal/modal";
import ReportTable from "../common/table/report_table";
import { nigerianStates } from 'nigerian-states-and-lgas';
import { toast } from "react-toastify";
import { NetworkErrorAlert } from "../common/sweetalert/sweetalert";
import { PageHeader } from "../common/pageHeader";

const Departments = (props) => {
    const token = props.loginData[0].token;

    const [isLoading, setIsLoading] = useState(true);
    const columns = ["SN", "Department Name", "Department Code", "HOD", "Action"];
    const [data, setData] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [formData, setFormData] = useState({
        EntryID: "",
        DepartmentCode: "",
        DepartmentName: "",
        HOD: "",
        InsertedBy: props.loginData[0].StaffID
    })

    const getData = async () => {
        try {
            await axios.get(`${serverLink}settings/department/list`, token).then((res) => {
                if (res.data.length > 0) {
                    let rows = [];
                    res.data.map((x, i) => {
                        rows.push([
                            i + 1,
                            x.DepartmentName,
                            x.DepartmentCode,
                            x.HODName,
                            (
                                <button className="btn btn-ghost-primary active w-100" data-bs-toggle="modal" data-bs-target="#modal-large" onClick={() => {
                                    setFormData({
                                        ...formData,
                                        EntryID: x.EntryID, DepartmentName: x.DepartmentName,
                                        DepartmentCode: x.DepartmentCode, HOD: x.HOD
                                    })
                                }}>Edit

                                </button>)
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

    const getStaff = async () => {
        await axios.get(`${serverLink}settings/staff/list`, token).then((res) => {
            if (res.data.length > 0) {
                setStaffList(res.data)
            }
        })
    }

    useEffect(() => {
        getData();
        getStaff();
    }, [])

    const onEdit = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const submitDepartment = async (e) => {
        e.preventDefault();
        try {
            if (formData.EntryID === "") {
                await axios.post(`${serverLink}settings/department/add`, formData, token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        document.getElementById("Close").click();
                        toast.success("department added successfully...");
                    } else if (res.data.message === "exist") {
                        toast.error("department already exists...");
                    } else {
                        NetworkErrorAlert();
                    }
                })
            } else {
                await axios.post(`${serverLink}settings/department/update`, formData, token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        document.getElementById("Close").click();
                        toast.success("department updated successfully...")
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
        setFormData({
            ...formData,
            EntryID: "",
            DepartmentCode: "",
            DepartmentName: "",
            HOD: "",
        })
    }

    return isLoading ? (<Loader />) : (
        <div className="page-wrapper">
            <PageHeader target="modal-large" Reset={Reset} title={["Departments", "Settings", "Department"]} btntext={"Create Department"} />

            <div className="page-body">
                <div className="container-xl">
                    <div className="row row-deck row-cards">

                        <ReportTable columns={columns} data={data} />

                    </div>
                </div>
            </div>

            <Modal title="Add/Edit Department" >
                <form onSubmit={submitDepartment}>
                    <div className="col-md-6 col-xl-12">
                        <div className="mb-3">
                            <label className="form-label required" htmlFor="Department Name">Department Name</label>
                            <input type="text" className="form-control" value={formData.DepartmentName} id="DepartmentName" onChange={onEdit} required placeholder="e.g Audit" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label required" htmlFor="Department Code">Department Code</label>
                            <input type="text" className="form-control" id="DepartmentCode" value={formData.DepartmentCode} onChange={onEdit} required placeholder="e.g AUD" />
                        </div>
                        <div className="mb-3">
                            <div className="form-label required">Head of Department State</div>
                            <select className="form-select" id="HOD" required onChange={onEdit} value={formData.HOD} >
                                <option value={""}>-select HOD-</option>
                                {
                                    staffList.length > 0 &&
                                    staffList.map((x, i) => {
                                        return (
                                            <option key={i} value={x.StaffID} >{x.FirstName + " " + x.MiddleName + "" + x.Surname}</option>
                                        )
                                    })
                                }
                            </select>
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

const mapDispatchToProps = (dispatch) => {
    return {
        setOnLoginDetails: (p) => {
            dispatch(setLoginDetails(p));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Departments);
