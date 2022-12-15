import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { colorsclasses_lt, formatDate, formatDateAndTime } from "../../../constants/constants";
import { serverLink } from "../../../constants/url";
import Loader from "../../common/loader";


const StaffActivities = (props) => {
    const token = props.loginData[0].token;
    const StaffID = props.loginData[0].StaffID
    const [isLoading, setIsLoading] = useState(true);
    const [auditList, setAuditList] = useState([]);
    const [auditList2, setAuditList2] = useState([])

    const getData = async () => {
        try {
            await axios.get(`${serverLink}staff/staff_audit/list/${StaffID}`, token).then((res) => {
                if (res.data.length > 0) {
                    setAuditList(res.data)
                    setAuditList2(res.data)
                }
                setIsLoading(false)
            })
        } catch (e) {

        }
    }

    useEffect(() => {
        getData();
    }, [])

    const handleSearch = (e) => {
        let filtered = auditList2.filter(x => x.Message.toLowerCase().includes(e.target.value.toLowerCase()) ||
            formatDateAndTime(x.InsertedDate, "date_and_time").toString().toLowerCase().includes(e.target.value.toLowerCase())
        )
        setAuditList(filtered)
    }

    return isLoading ? (<Loader />) : (
        <div className="card mt-5">
            <div className="card-body w-100">
                <div className="d-flex justify-content-lg-between">
                    <div><h3>Activities Audit</h3></div>
                    <div style={{ float: 'right' }}><input className="form-control w-9 me-3" placeholder="search..." onChange={handleSearch} /></div>
                </div>
            </div>
            <div className="card-body" style={{maxHeight: '500px', overflowY:'auto'}} >
                {
                    auditList.length > 0 ?
                        auditList.map((x, i) => {
                            const randomcolor = colorsclasses_lt[Math.floor(Math.random() * colorsclasses_lt.length)];
                            return (
                                <div className="divide-y" key={i}>
                                    <div>
                                        <div className="row">
                                            <div className="col-auto">
                                                <span className={`avatar bg-${randomcolor}`}>
                                                    {x.FullName.split(" ")[0][0] + x.FullName.split(" ")[1][0]}
                                                </span>
                                            </div>
                                            <div className="col">
                                                <div className="text-truncate">
                                                    <strong>{x.FullName}</strong> <br /> {x.Message}
                                                </div>

                                            </div>
                                            <div className="col-auto align-self-center">
                                                <div className="text-primary">{formatDateAndTime(x.InsertedDate, "date_and_time")}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
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

export default connect(mapStateToProps, null)(StaffActivities)
