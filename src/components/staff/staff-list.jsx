import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { serverLink } from "../../constants/url";
import Loader from "../common/loader";
import { PageHeader } from "../common/pageHeader";
import ReportTable from "../common/table/report_table";
import zakat from '../../images/zakat.jpg'
import { setStaffDetails } from "../../action/action";


const StaffList = (props) => {
    const navigate = useNavigate()
    const token = props.loginData[0].token;
    const branch = props.loginData[0].Branch

    const [isLoading, setIsLoading] = useState(true);
    const columns = ["SN", "StaffID", "Staff Name", "Email", "Phone", "Branch", "Department", "Status"];

    const [data, setData] = useState([]);
    const [staffList, setStaffList] = useState([])
    const [staffList2, setStaffList2] = useState([])

    const getData = async () => {
        try {
            await axios.get(`${serverLink}staff/all_staff_list/${branch}`, token).then((res) => {
                if (res.data.length > 0) {
                    let rows = [];
                    res.data.map((x, i) => {
                        rows.push([
                            i + 1,
                            x.StaffID,
                            <Link to={`/manage-staff?st=${x.StaffID}`}>
                                {x.FirstName + " " + x.MiddleName + " " + x.Surname}
                            </Link>,
                            x.Email,
                            x.Phone,
                            x.Branch,
                            x.Department,
                            (<label className={x.IsActive.toString() === "0" ? "badge bg-info" : "badge bg-success"} >{x.IsActive.toString() === "0" ? "Inactive" : "Active"}</label>)
                        ])
                    })
                    setStaffList(res.data)
                    setStaffList2(res.data);
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
    }, []);

    const handleSearch = (e) => {
        const filtered = staffList2.filter(x => x.FirstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
            x.MiddleName.toLowerCase().includes(e.target.value.toLowerCase()) ||
            x.Surname.toLowerCase().includes(e.target.value.toLowerCase()) ||
            x.Department.toLowerCase().includes(e.target.value.toLowerCase()) ||
            x.Designation.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setStaffList(filtered)
    }

    const Reset = () => {
        navigate('/manage-staff');
    }

    return isLoading ? (<Loader />) : (
        <div className="page-wrapper">
            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            <h2 className="page-title">Staff</h2>
                            <span>
                                Staff List/<a href="#" className="text-muted"> Staff </a></span>
                        </div>
                        <div className="col-12 col-md-auto ms-auto d-print-none">
                            <div className="d-flex">
                                {/* <input type="search" onChange={handleSearch} className="form-control d-inline-block w-9 me-3" placeholder="Search user…" /> */}
                                <Link
                                    to="/manage-staff"
                                    className="btn btn-primary d-none d-sm-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24"
                                        strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <line x1={12} y1={5} x2={12} y2={19} />
                                        <line x1={5} y1={12} x2={19} y2={12} />
                                    </svg>
                                    Add Staff
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-body">
                <div className="container-xl">
                    <div className="row row-deck row-cards">
                        <ReportTable columns={columns} data={data} />
                    </div>
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        loginData: state.LoginDetails,
        designation_list: state.designation_list
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setonStaffDetails: (p) => {
            dispatch(setStaffDetails(p));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffList)
