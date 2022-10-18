import { Token } from "@mui/icons-material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { currencyConverter, formatDate, formatDateAndTime } from "../../../constants/constants";
import { serverLink } from "../../../constants/url";
import ComponentLoader from "../../common/modal/component-loader";
import { NetworkErrorAlert } from "../../common/sweetalert/sweetalert";


const CustomerAccounts = (props) => {
    const token = props.loginData[0].token
    const [accounts, setAccounts] = useState([]);
    const [accounts2, setAccounts2] = useState([]);

    const getData = async () => {
        try {
            await axios.get(`${serverLink}customer/accounts/list/${props.customer[0]?.CustomerID}`, token).then((res) => {
                if (res.data.length > 0) {
                    setAccounts(res.data);
                    setAccounts2(res.data)
                }
            })
        } catch (e) {
            NetworkErrorAlert();
        }
    }

    useEffect(() => {
        if (props.customer.length > 0) {
            getData();
        }
    }, [])

    const onSearch=(e)=>{
        let filtered = accounts2.length > 0 &&
                        accounts2.filter(x=>x.AccountNo.includes(e.target.value)) ||
                        accounts2.filter(x=>x.AccountBalance.includes(e.target.value)) ||
                        accounts2.filter(x=>x.Bvn.includes(e.target.value)) ||
                        accounts2.filter(x=>x.AccountOpeningDate.includes(e.target.value))
        setAccounts(filtered)
    }

    return props.customer.length === 0 ? (<ComponentLoader />) : (

        <div className="col-12">
            <div className="card card-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h3 className="card-title">Registered Accounts</h3>
                        <div>
                            <input className="form-control" placeholder="search" onChange={onSearch}  />
                        </div>
                    </div>
                    <div className="ratio ratio-16x9">
                        <div className="table-responsive">
                            <table className="table table-vcenter card-table">
                                <thead>
                                    <tr>
                                        <th>Account Number</th>
                                        <th>BVN</th>
                                        <th>Account Balance</th>
                                        <th>Opening Date</th>
                                        <th>Account Status</th>
                                        <th>Closing Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        accounts.length > 0 ?
                                            accounts.map((x, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{x.AccountNo} </td>
                                                        <td className="text-muted">{x.Bvn}</td>
                                                        <td className="text-muted">{currencyConverter(x.AccountBalance)}</td>
                                                        <td className="text-muted">{formatDateAndTime(x.AccountOpeningDate, "date_and_time")}</td>
                                                        <td className="text-muted">
                                                            <span className={x.AccountStatus === 1 ? "badge bg-success" : "badge bg-danger"}>
                                                                {x.AccountStatus === 1 ? "Active" : "InActive"}
                                                            </span>
                                                        </td>
                                                        <td className="text-muted">{x.AccountClosingDate !== null ? formatDateAndTime(x.AccountClosingDate, "date_and_time") : ""}</td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr className="text-center">
                                                <td>
                                                    <h2>
                                                    </h2>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
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
        branch_list: state.branch_list,
        designation_list: state.designation_list,
        staff_details: state.staff_details
    };
};

export default connect(mapStateToProps, null)(CustomerAccounts)
