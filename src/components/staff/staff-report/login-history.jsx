import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { colorsclasses_lt, formatDate, formatDateAndTime } from "../../../constants/constants";
import { serverLink } from "../../../constants/url";
import Loader from "../../common/loader";


const LoginHistory = (props) => {
    const token = props.loginData[0].token;
    const StaffID = props.loginData[0].StaffID
    const [isLoading, setIsLoading] = useState(true);
    const [loginList, setloginList] = useState([]);
    const [loginList2, setloginList2] = useState([])

    const getData = async () => {
        try {
            await axios.get(`${serverLink}staff/staff_login/list/${StaffID}`, token).then((res) => {
                if (res.data.length > 0) {
                    setloginList(res.data)
                    setloginList2(res.data)
                }
                setIsLoading(false)
            })
        } catch (e) {
            console.log(e)

        }
    }

    useEffect(() => {
        getData();
    }, [])

    const handleSearch = (e) => {
        let filtered = loginList2.filter(x => x.Location.toString().toLowerCase().includes(e.target.value.toLowerCase()) ||
            formatDateAndTime(x.InsertedDate, "date_and_time").toString().toLowerCase().includes(e.target.value.toLowerCase()) ||
            x.IPAddress.toString().toLowerCase().includes(e.target.value.toLowerCase())
        )
        setloginList(filtered)
    }

    return isLoading ? (<Loader />) : (
        <div className="card mt-5">
            <div className="card-body w-100">
                <div className="d-flex justify-content-lg-between">
                    <div><h3>Login History</h3></div>
                    <div style={{ float: 'right' }}><input className="form-control w-9 me-3" placeholder="search..." onChange={handleSearch} /></div>
                </div>
            </div>
            <div className="card-body">
                {
                    loginList.length > 0 ?
                        loginList.map((x, i) => {
                            const randomcolor = colorsclasses_lt[Math.floor(Math.random() * colorsclasses_lt.length)];
                            return (
                                <div className="card" key={i}>
                                    <div className="table-responsive">
                                        <table className="table table-vcenter card-table">
                                            <thead>
                                                <tr>
                                                    <th>Staff</th>
                                                    <th>Session</th>
                                                    <th>Login Time</th>
                                                    <th>Location</th>
                                                    <th>IPAddress</th>
                                                    <th>Logout Time</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{x.StaffID} </td>
                                                    <td className="text-muted">
                                                       {x.SessionID}
                                                    </td>
                                                    <td className="text-muted">{formatDateAndTime(x.LoginTime, "date_and_time")}</td>
                                                    <td className="text-muted">{x.Location}</td>
                                                    <td className="text-muted">{x.IPAddress}</td>
                                                    <td className="text-muted">{x.LogoutTime}</td>
                                                    <td>{formatDate(x.InsertedDate)}</td>
                                                </tr>                                               
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className="text-center">
                            <h2>
                                No Activities
                            </h2>
                        </div>
                }

            </div>

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        loginData: state.LoginDetails,
    };
};

export default connect(mapStateToProps, null)(LoginHistory)
