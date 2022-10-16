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

const Roles = (props) => {
    const token = props.loginData[0].token;

    const [isLoading, setIsLoading] = useState(true);
    const columns = ["SN", "Role Title", "Status", "Action"];
    const [data, setData] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [formData, setFormData] = useState({
        ID: "",
        RoleName: "",
        Status: 1,
        InsertedBy: props.loginData[0].StaffID
    })

    const getData = async () => {
        try {
            await axios.get(`${serverLink}settings/roles/list`, token).then((res) => {
                if (res.data.length > 0) {
                    let rows = [];
                    res.data.map((x, i) => {
                        rows.push([
                            i + 1,
                            x.RoleName,
                            (<label className={x.Status === 0 ? "badge bg-info" : "badge bg-success"} >{x.Status === 0 ? "Inactive" : "Active"}</label>),

                            (
                                <button className="btn btn-ghost-primary active w-100" data-bs-toggle="modal" data-bs-target="#modal-large" onClick={() => {
                                    setFormData({
                                        ...formData,
                                        ID: x.ID, RoleName: x.RoleName,
                                        Status: x.Status, HOD: x.HOD
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
       // getStaff();
    }, [])

    const onEdit = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const submitRole = async (e) => {
        e.preventDefault();
        try {
            if (formData.ID === "") {
                await axios.post(`${serverLink}settings/roles/add`, formData, token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        document.getElementById("Close").click();
                        toast.success("roles added successfully...");
                    } else if (res.data.message === "exist") {
                        toast.error("roles already exists...");
                    } else {
                        NetworkErrorAlert();
                    }
                })
            } else {
                await axios.post(`${serverLink}settings/roles/update`, formData, token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        document.getElementById("Close").click();
                        toast.success("roles updated successfully...")
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
            ID: "",
            RoleName: "",
            Status: "",
        })
    }

    return isLoading ? (<Loader />) : (
        <div className="page-wrapper">
            <PageHeader target="modal-large" Reset={Reset} title={["Roles", "Settings", "Roles"]} btntext={"Add Role"} />

            <div className="page-body">
                <div className="container-xl">
                    <div className="row row-deck row-cards">
                        <ReportTable columns={columns} data={data} />
                    </div>
                </div>
            </div>

            <Modal title="Add/Edit Roles" >
                <form onSubmit={submitRole}>
                    <div className="col-md-6 col-xl-12">
                        <div className="mb-3">
                            <label className="form-label required" htmlFor="Department Name">Role Name</label>
                            <input type="text" className="form-control" value={formData.RoleName} id="RoleName" onChange={onEdit} required placeholder="e.g Manager" />
                        </div>

                        <div className="mb-3">
                            <div className="form-label required">Status</div>
                            <select className="form-select" id="Status" required onChange={onEdit} value={formData.Status} >
                                <option value={""}>-select role-</option>
                                <option value={1}>Active</option>
                                <option value={0}>Inactive</option>
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

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
