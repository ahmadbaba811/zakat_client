import { Token } from "@mui/icons-material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { currencyConverter, formatDate, formatDateAndTime } from "../../../constants/constants";
import { serverLink } from "../../../constants/url";
import ComponentLoader from "../../common/modal/component-loader";
import { NetworkErrorAlert } from "../../common/sweetalert/sweetalert";



const CustomerTransactions = (props) => {
    const token = props.loginData[0].token
    const [transactions, settransactions] = useState([]);
    const [transactions2, settransactions2] = useState([]);
    

    const getData = async () => {
        try {
            await axios.get(`${serverLink}customer/transactions/list/${props.customer[0]?.CustomerID}`, token).then((res) => {
                if (res.data.length > 0) {
                    settransactions(res.data);
                    settransactions2(res.data)
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

    const onSearch = (e) => {
        let filtered = transactions2.length > 0 &&
            transactions2.filter(x => x.TransactionNo.includes(e.target.value)) ||
            transactions2.filter(x => currencyConverter(x.TransactionAmount).includes(e.target.value)) ||
            transactions2.filter(x => formatDateAndTime(x.TransactionDate, "date").includes(e.target.value)) ||
            transactions2.filter(x => x.TransactionBranch.toLowerCase().includes(e.target.value.toLowerCase())) ||
            transactions2.filter(x => x.SourceAccountName.toLowerCase().includes(e.target.value.toLowerCase())) ||
            transactions2.filter(x => x.DestinationAccountName.toLowerCase().includes(e.target.value.toLowerCase())) ||
            transactions2.filter(x => x.TransactionDescription.toLowerCase().includes(e.target.value.toLowerCase())) ||
            transactions2.filter(x => x.SourceAccountNo.includes(e.target.value.toLowerCase())) ||
            transactions2.filter(x => x.DestinationAccountNo.includes(e.target.value.toLowerCase()))
        settransactions(filtered)
    }
   
    return props.customer.length === 0 ? (<ComponentLoader />) : (

        <div className="col-12">
            <div className="card card-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h3 className="card-title">Transactions</h3>
                        <div>
                            <input className="form-control" placeholder="search" onChange={onSearch} />
                        </div>
                    </div>
                    
                    <div className="ratio ratio-16x9">
                        <div className="table-responsive">
                            <table className="table table-vcenter card-table">
                                <thead>
                                    <tr>
                                        <th>Transaction No</th>
                                        <th>Transaction Branch</th>
                                        <th>Amount</th>
                                        <th>Description</th>
                                        <th>Description</th>
                                        <th>Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        transactions.length > 0 ?
                                            transactions.map((x, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{x.TransactionNo}</td>
                                                        <td>{x.TransactionBranch}</td>
                                                        <td className="text-muted">{currencyConverter(x.TransactionAmount)}</td>
                                                        <td>{x.TransactionDescription}</td>
                                                        <td className="text-muted">{formatDateAndTime(x.TransactionDate, "date")}</td>
                                                        <td className="text-muted">
                                                            <span className={x.TransactionStatus === 1 ? "badge bg-success" : "badge bg-danger"}>
                                                                {x.TransactionStatus === 1 ? "Successful" : "Failed"}
                                                            </span>
                                                        </td>
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

export default connect(mapStateToProps, null)(CustomerTransactions)
