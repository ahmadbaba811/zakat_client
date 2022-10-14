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
import { currencyConverter } from "../../constants/constants";

const LoanTypes = (props) => {
    const token = props.loginData[0].token;

    const [isLoading, setIsLoading] = useState(true);
    const columns = ["SN", "Loan Name", "Code", "Min Amt(N)", "Max Amt(N)", "Status", "Action"];
    const [data, setData] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [formData, setFormData] = useState({
        EntryID: "",
        LoanName: "",
        LoanCode: "",
        MinAmount: "",
        MaxAmount: "",
        Status: 1,
        InsertedBy: props.loginData[0].StaffID
    })

    const getData = async () => {
        try {
            await axios.get(`${serverLink}settings/loan_types/list`, token).then((res) => {
                if (res.data.length > 0) {
                    let rows = [];
                    res.data.map((x, i) => {
                        rows.push([
                            i + 1,
                            x.LoanName,
                            x.LoanCode,
                            currencyConverter(x.MinAmount),
                            currencyConverter(x.MaxAmount),
                            (<label className={x.Status === 0 ? "badge bg-info" : "badge bg-success"} >{x.Status === 0 ? "Inactive" : "Active"}</label>),

                            (
                                <button className="btn btn-ghost-primary active w-100" data-bs-toggle="modal" data-bs-target="#modal-large" onClick={() => {
                                    setFormData({
                                        ...formData,
                                        EntryID: x.EntryID, LoanName: x.LoanName, LoanCode: x.LoanCode, MinAmount: x.MinAmount,
                                        MaxAmount: x.MaxAmount,
                                        Status: x.Status,
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

    const submitLoanType = async (e) => {
        e.preventDefault();
        try {
            if (formData.EntryID === "") {
                await axios.post(`${serverLink}settings/loan_types/add`, formData, token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        document.getElementById("Close").click();
                        toast.success("Loan type added successfully...");
                    } else if (res.data.message === "exist") {
                        toast.error("Loan type already exists...");
                    } else {
                        NetworkErrorAlert();
                    }
                })
            } else {
                await axios.patch(`${serverLink}settings/loan_types/update`, formData, token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        document.getElementById("Close").click();
                        toast.success("Loan type updated successfully...")
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
            LoanName: "",
            LoanCode: "",
            MinAmount: "",
            MaxAmount: "",
            Status: 1
        })
    }

    return isLoading ? (<Loader />) : (
        <div className="page-wrapper">
            <PageHeader target="modal-large" Reset={Reset} title={["Loan Types", "Settings", "Loan Type"]} btntext={"Add Loan Type"} />

            <div className="page-body">
                <div className="container-xl">
                    <div className="row row-deck row-cards">
                        <ReportTable columns={columns} data={data} />
                    </div>
                </div>
            </div>

            <Modal title="Add/Edit Loan Type" >
                <form onSubmit={submitLoanType}>
                    <div className="col-md-6 col-xl-12">
                        <div className="mb-3">
                            <label className="form-label required" htmlFor="LoanName">Loan Name</label>
                            <input type="text" className="form-control" value={formData.LoanName} id="LoanName" onChange={onEdit} required placeholder="e.g Zakat loan" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label required" htmlFor="LoanCode">Loan Code</label>
                            <input type="text" className="form-control" value={formData.LoanCode} id="LoanCode" onChange={onEdit} required placeholder="e.g ZKT" />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label required" htmlFor="MinAmount">Min. Amount</label>
                                    <input type="number" className="form-control" value={formData.MinAmount} id="MinAmount" onChange={onEdit} required placeholder="e.g 0.00" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label required" htmlFor="MaxAmount">Max. Amount</label>
                                    <input type="number" className="form-control" value={formData.MaxAmount} id="MaxAmount" onChange={onEdit} required placeholder="e.g 0.00" />
                                </div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoanTypes);
