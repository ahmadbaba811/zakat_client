import { connect } from "react-redux";
import { setLoginDetails } from "../../action/action";
import Loader from "../common/loader";
import { PageHeader } from "../common/pageHeader";
import ReportTable from "../common/table/report_table";

const { default: axios } = require("axios");
const { useEffect } = require("react");
const { useState } = require("react");
const { toast } = require("react-toastify");
const { serverLink } = require("../../constants/url");
const { default: Modal } = require("../common/modal/modal");
const { NetworkErrorAlert } = require("../common/sweetalert/sweetalert");

const LoanTypes =(props)=>{
    const token = props.loginData[0].token;
    const [error, seterror] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const columns = ["SN", "Loan Name", "Loan Code", "MinAmount", "MaxAmount", "Status", "InsertedBy", "InsertedDate"];
    const [data, setData] = useState([]);
    const [loanTypeList, setLoanTypeList] = useState([]);
    const [formData, setFormData] = useState({
        ID: "",
        LoanCode: "",
        LoanName: "",
        MinAmount: "",
        MaxAmount: "",
        Status: 1,
        InsertedBy: "",
        InsertedDate: ""
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
                            x.MinAmount,
                            x.MaxAmount,
                            x.State,
                            x.InsertedBy,
                            x.InsertedDate,
                            (<label className={x.Status === 0 ? "badge bg-info" : "badge bg-success"} >
                                {x.Status === 0 ? "Inactive" : "Active"}
                            </label>),
                            (<button className="btn btn-ghost-primary active w-100" data-bs-toggle="modal" 
                                data-bs-target="#modal-large" onClick={() => {
                                setFormData({
                                    ...formData,
                                    ID: x.ID, LoanName: x.LoanName,
                                    LoanCode: x.LoanCode, MinAmount: x.MinAmount, MaxAmount: x.MaxAmount, State: x.State, 
                                    InsertedBy: x.InsertedBy, InsertedDate: x.InsertedDate
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

    const getLoanTypes = async()=>{
        await axios.get(`${serverLink}settings/loan_types/list`, token).then((res)=>{
            if(res.data.length > 0) {
                setLoanTypeList(res.data)
            }
        })
    }

    useEffect(() => {
        getData();
        getLoanTypes();
    }, []);

    const submitLoanType = async (e) => {
        e.preventDefault();
        console.log("data: "+formData.LoanCode)
        try {
            if (formData.ID === "") {
                await axios.post(`${serverLink}settings/loan_types/add`, formData, token).then((res) => {
                    console.log(res.data.message)
                    if (res.data.message === "success") {
                        getData();
                        document.getElementById("Close").click();
                        toast.success("loan type added successfully...");
                    }else if (res.data.message === "exist"){
                        toast.error("loan type already exists...");
                    }else{
                        NetworkErrorAlert();
                    }
                })
            } else {
                await axios.post(`${serverLink}settings/loan_types/update`, formData, token).then((res) => {
                    if (res.data.message === "success") {
                        getData();
                        document.getElementById("Close").click();
                        toast.success("loan type updated successfully...")
                    }else{
                        NetworkErrorAlert();
                    }
                })
            }
        } catch (e) {
            NetworkErrorAlert();
        }
    }

    
    const onEdit = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
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
    const Reset = () => {
        setFormData({
            ...formData,
            ID: "",
            LoanCode: "",
            LoanName: "",
            MinAmount: "",
            MaxAmount: "",
            InsertedBy: "",
            InsertedDate: "",
            Status: 1,
        })
    }

    return isLoading ? (<Loader />) : (
        <div className="page-wrapper">
            <PageHeader target="modal-large" title={["Loan Types", "Settings", "Loan Types"]} btntext={"Create new Loan Type"}  />

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
                            <input type="text" className="form-control" value={formData.LoanName} id="LoanName" 
                            onChange={onEdit} required placeholder="e.g Business Loan Type" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label required" htmlFor="LoanCode">Loan Code</label>
                            <input type="text" disabled={formData.ID !== "" ? true : false} className="form-control" 
                            id="LoanCode" value={formData.LoanCode} onChange={onEdit} required placeholder="e.g BUS" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label required" htmlFor="MinAmount">Min Amount</label>
                            <input type="text" className="form-control" value={formData.MinAmount} onChange={onEdit} 
                                id="MinAmount" required placeholder="e.g 2,400,000" >
                            </input>
                        </div>
                        <div className="mb-3">
                            <label className="form-label required" htmlFor="MaxAmount">Max Amount</label>
                            <input type="text" className="form-control" value={formData.MaxAmount} onChange={onEdit} 
                                id="MaxAmount" required placeholder="e.g 2,400,000" >
                            </input>
                        </div>
                       
                        <div className="mb-3">
                            <label className="form-label required" htmlFor="Town">Inserted By</label>
                            <input type="text" className="form-control" id="InsertedBy" onChange={onEdit} 
                            value={formData.InsertedBy} required placeholder="e.g Ikeja" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label required" htmlFor="InsertedDate">Inserted Date</label>
                            <input type="date" className="form-control" id="InsertedDate" onChange={onEdit} 
                            value={formData.InsertedDate} required placeholder="e.g Ikeja" />
                        </div>
                        <div className="row">
                            
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
