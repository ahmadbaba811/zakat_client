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
import { formatDate } from "../../constants/constants";

const Designations = (props) => {
    const token = props.loginData[0].token;

    const [isLoading, setIsLoading] = useState(true);
    const columns = ["SN", "Designation Code", "Designation Title", "Action"];
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        ID: "",
        DesignationCode: "",
        DesignationName:"",
        Status: 1,
        InsertedBy: props.loginData[0].StaffID
    })

    const getData = async () => {
        try {
            await axios.get(`${serverLink}settings/designation/list`, token).then((res) => {
                if (res.data.length > 0) {
                    let rows = [];
                    res.data.map((x, i) => {
                        rows.push([
                            i + 1,
                            x.DesignationCode,
                            x.DesignationName,
                            (
                                <button className="btn btn-ghost-primary active w-100" data-bs-toggle="modal" data-bs-target="#modal-large" onClick={() => {
                                    setFormData({
                                        ...formData,
                                        EntryID: x.ID, 
                                        DesignationName: x.DesignationName,
                                        DesignationCode: x.DesignationCode
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

    useEffect(() => {
        getData();
    }, [])

    const onEdit = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const submitDesignation = async (e) => {
        e.preventDefault();
        try {
            if (formData.ID === "") {
                await axios.post(`${serverLink}settings/designation/add`, formData, token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        document.getElementById("Close").click();
                        toast.success("designation added successfully...");
                    } else if (res.data.message === "exist") {
                        toast.error("designation already exists...");
                    } else {
                        NetworkErrorAlert();
                    }
                })
            } else {
                await axios.post(`${serverLink}settings/designation/update`, formData, token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        document.getElementById("Close").click();
                        toast.success("designation updated successfully...")
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
            <PageHeader target="modal-large" Reset={Reset} title={["Designation", "Settings", "designation"]} btntext={"Add Role"} />

            <div className="page-body">
                <div className="container-xl">
                    <div className="row row-deck row-cards">
                        <ReportTable columns={columns} data={data} />
                    </div>
                </div>
            </div>

            <Modal title="Add/Edit Designation" size="modal-sm" >
                <form onSubmit={submitDesignation}>
                    <div className="col-md-6 col-xl-12">
                        <div className="mb-3">
                            <label className="form-label required" htmlFor="Department Name">Designation Code</label>
                            <input type="text" disabled={formData.EntryID !== "" ? true : false} className="form-control" value={formData.DesignationCode} id="DesignationCode" onChange={onEdit} required placeholder="e.g MGR" />
                        </div>

                        <div className="mb-3">
                            <div className="form-label required">Designation Name</div>
                            <input type="text" className="form-control" value={formData.DesignationName} id="DesignationName" onChange={onEdit} required placeholder="e.g Manager" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Designations);
