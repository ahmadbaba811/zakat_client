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

const Branches = (props) => {
    const token = props.loginData[0].token;
    const [error, seterror] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [BranchList, setBranchList] = useState([]);
    const columns = ["SN", "Branch Name", "Branch Code", "Address", "State", "Lga", "Manager", "Status", "Action"];
    const [data, setData] = useState([]);
    const statesLga = nigerianStates.all()
    const [lgaList, setLgaList] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [formData, setFormData] = useState({
        EntryID: "",
        BranchCode: "",
        BranchName: "",
        BranchAddress: "",
        State: "",
        Lga: "",
        Town: "",
        Manager: "",
        Status: 1,
        InsertedBy: props.loginData[0].StaffID
    })

    const getData = async () => {
        try {
            await axios.get(`${serverLink}settings/branch/list`, token).then((res) => {
                if (res.data.length > 0) {
                    let rows = [];
                    res.data.map((x, i) => {
                        rows.push([
                            i + 1,
                            x.BranchName,
                            x.BranchCode,
                            x.BranchAddress,
                            x.State,
                            x.Lga,
                            x.Manager,
                            (<label className={x.Status === 0 ? "badge bg-info" : "badge bg-success"} >{x.Status === 0 ? "Inactive" : "Active"}</label>),
                            (<button className="btn btn-ghost-primary active w-100" data-bs-toggle="modal" data-bs-target="#modal-large" onClick={() => {
                                setLgaList(statesLga.filter(k => k.state === x.State)[0].lgas)
                                setFormData({
                                    ...formData,
                                    EntryID: x.EntryID, BranchName: x.BranchName,
                                    BranchCode: x.BranchCode, BranchAddress: x.BranchAddress, State: x.State, Lga: x.Lga, Manager: x.Manager, Status: x.Status, Town: x.Town
                                })
                            }}>Edit

                            </button>)
                        ])
                    })
                    setData(rows)
                    setBranchList(res.data);
                }
                setIsLoading(false);
            })
        } catch (e) {
            console.log(e)
        }
    }

    const getStaff = async()=>{
        await axios.get(`${serverLink}settings/staff/list`, token).then((res)=>{
            if(res.data.length > 0) {
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
        if (e.target.id === "State") {
            let filtered = statesLga.filter(x => x.state === e.target.value);
            setLgaList(filtered.length > 0 ? filtered[0].lgas : []);
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
        if (e.target.id === "Status") {
            if (e.target.checked === true) {
                setFormData({
                    ...formData,
                    [e.target.id]: e.target.value
                })
            } else {
                setFormData({
                    ...formData,
                    [e.target.id]: e.target.value
                })
            }

        }
    }

    const submitBranch = async (e) => {
        e.preventDefault();
        try {
            if (formData.EntryID === "") {
                await axios.post(`${serverLink}settings/branch/add`, formData, token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        document.getElementById("Close").click();
                        toast.success("branch added successfully...");
                    }else if (res.data.message === "exist"){
                        toast.error("branch already exists...");
                    }else{
                        NetworkErrorAlert();
                    }
                })
            } else {
                await axios.post(`${serverLink}settings/branch/update`, formData, token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        document.getElementById("Close").click();
                        toast.success("branch updated successfully...")
                    }else{
                        NetworkErrorAlert();
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
            EntryID: "",
            BranchCode: "",
            BranchName: "",
            BranchAddress: "",
            State: "",
            Lga: "",
            Town: "",
            Manager: "",
            Status: 1,
        })
    }

    return isLoading ? (<Loader />) : (
        <div className="page-wrapper">
            <PageHeader target="modal-large" title={["Branches", "Settings", "Branches"]} btntext={"Create new Branch"}  />

            <div className="page-body">
                <div className="container-xl">
                    <div className="row row-deck row-cards">

                        <ReportTable columns={columns} data={data} />

                    </div>
                </div>
            </div>

            <Modal title="Add/Edit Branch" >
                <form onSubmit={submitBranch}>
                    <div className="col-md-6 col-xl-12">
                        <div className="mb-3">
                            <label className="form-label required" htmlFor="Branch Name">Branch Name</label>
                            <input type="text" className="form-control" value={formData.BranchName} id="BranchName" onChange={onEdit} required placeholder="e.g Ikeja Branch" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label required" htmlFor="Branch Name">Branch Code</label>
                            <input type="text" disabled={formData.EntryID !== "" ? true : false} className="form-control" id="BranchCode" value={formData.BranchCode} onChange={onEdit} required placeholder="e.g IKJ" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label required" htmlFor="Branch Name">Branch Adress</label>
                            <textarea type="text" className="form-control" rows={3} value={formData.BranchAddress} onChange={onEdit} id="BranchAddress" required placeholder="e.g Block C Adekunle str." >

                            </textarea>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <div className="form-label required">Branch State</div>
                                    <select className="form-select" id="State" required onChange={onEdit} value={formData.State} >
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
                            <div className="col-md-6">
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
                        </div>
                        <div className="mb-3">
                            <label className="form-label required" htmlFor="Town">Branch Town</label>
                            <input type="text" className="form-control" id="Town" onChange={onEdit} value={formData.Town} required placeholder="e.g Ikeja" />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <div className="form-label">Branch Manager</div>
                                    <select className="form-select" id="Manager" onChange={onEdit} value={formData.Manager} >
                                        <option value={""}>-select manager-</option>
                                        {
                                            staffList.length > 0 &&
                                            staffList.map((x, i) => {
                                                return (
                                                    <option key={i} value={x.StaffID} >{x.FirstName+" "+x.MiddleName+""+x.Surname}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <div className="form-label">Status</div>
                                    <select className="form-select" id="Status" onChange={onEdit} value={formData.Status} >
                                        <option value={""}>-select manager-</option>
                                        <option value={1}>Active</option>
                                        <option value={0}>Inactive</option>
                                        
                                    </select>
                                </div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Branches);
