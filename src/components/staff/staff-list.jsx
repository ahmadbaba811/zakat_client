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

const StaffList = (props) => {
    const navigate = useNavigate()
    const token = props.loginData[0].token;

    const [isLoading, setIsLoading] = useState(true);
    const columns = ["SN", "StaffID", "Staff Name", "Email", "Phone", "Branch", "Department", "Status"];

    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            await axios.get(`${serverLink}staff/staff_list`, token).then((res) => {
                if (res.data.length > 0) {
                    let rows = [];
                    res.data.map((x, i) => {
                        rows.push([
                            i + 1,
                            x.StaffID,
                            <Link to={`/manage-staff?st=${x.StaffID}`}>
                            {x.FirstName+" "+x.MiddleName+" "+x.Surname}
                            </Link>,
                            x.Email,
                            x.Phone,
                            x.Branch,
                            x.Department,
                            (<label className={x.Status === 0 ? "badge bg-info" : "badge bg-success"} >{x.Status === 0 ? "Inactive" : "Active"}</label>)
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

    useEffect(()=>{
        getData();
    }, []);

    const Reset =()=>{
        navigate('/manage-staff');
    }

    return isLoading ? (<Loader/>) : (
        <div className="page-wrapper">
            <PageHeader Reset={Reset} title={["Staff", "Staff List", "Staff"]} btntext="Add Staff"  />

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
    };
};

export default connect(mapStateToProps, null)(StaffList)
