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


const StaffReportList = (props) => {
    const navigate = useNavigate()
    const token = props.loginData[0].token;
    const branch = props.loginData[0].Branch

    const [isLoading, setIsLoading] = useState(true);
    const [staffList, setStaffList] = useState([])
    const [staffList2, setStaffList2] = useState([])

    const getData = async () => {
        try {
            await axios.get(`${serverLink}staff/all_staff_list/${branch}`, token).then((res) => {
                if (res.data.length > 0) {
                    setStaffList(res.data)
                    setStaffList2(res.data);
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
                                <input type="search" onChange={handleSearch} className="form-control d-inline-block w-9 me-3" placeholder="Search user…" />
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
                        <div className="row">
                            {
                                staffList.length > 0 ?
                                    staffList.map((x, i) => {
                                        const img = x.ImagePath === "" ? zakat : `${serverLink}public/uploads/staff/${x.ImagePath}`
                                        return (
                                            <div className="col-md-3" key={i}>
                                                <div className="card card-link" href="#">
                                                    <div className="card-cover card-cover-blurred text-center" style={{ backgroundImage: `url(${img}` }}>
                                                        <span className="avatar avatar-xl avatar-thumb avatar-rounded" style={{ backgroundImage: `url(${img}` }}></span>
                                                    </div>
                                                    <div className="card-body text-center">
                                                        <div className="card-title mb-1">
                                                            <Link to={`manage-staff?st=${x.StaffID}`}>
                                                                {x.FirstName} {x.MiddleName} {x.Surname}
                                                            </Link>
                                                        </div>
                                                        <div className="text-muted">
                                                            {props.designation_list.length > 0 ?
                                                                props.designation_list.filter(j => j.DesignationCode === x.Designation)[0].DesignationName
                                                                : ''}
                                                        </div>
                                                    </div>
                                                    <div className="d-flex">
                                                        <Link to={`/manage-staff?st=${x.StaffID}`} className="card-btn">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-big-right-lines" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                <path d="M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-3v-6h3z"></path>
                                                                <path d="M3 9v6"></path>
                                                                <path d="M6 9v6"></path>
                                                            </svg>
                                                            Details</Link>
                                                        <Link to={`/staff-report/${x.StaffID}`}
                                                            onClick={() => {
                                                                props.setonStaffDetails(x)
                                                            }}

                                                            className="card-btn">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-award" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                <circle cx={12} cy={9} r={6}></circle>
                                                                <path d="M12.002 15.003l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889"></path>
                                                                <path d="M6.802 12.003l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889"></path>
                                                            </svg>
                                                            Report </Link>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })
                                    :
                                    <div className="text-center">
                                        <h2>No Staff Record Found</h2>
                                    </div>
                            }
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

export default connect(mapStateToProps, mapDispatchToProps)(StaffReportList)
