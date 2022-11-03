import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Audit, currencyConverter, formatDateAndTime } from "../../constants/constants";
import { serverLink } from "../../constants/url";
import ComponentLoader from "../common/modal/component-loader";
import Modal from "../common/modal/modal";
import { PageHeader } from "../common/pageHeader";
import { NetworkErrorAlert } from "../common/sweetalert/sweetalert";
import ReportTable from "../common/table/report_table";


const LoanPayBacks = (props) => {
    const token = props.loginData[0].token
    const [isLoading, setIsLoading] = useState(true)

    const [payback, setpayback] = useState([]);
    const columns = ["ID", "CustomerID", "ApplicationID", "Branch", "PayBacks Sequence", "Action"];
    const [data, setData] = useState([]);
    const [CustomerID, setPayBackCustomerID] = useState('')
    const [totalPaid, setTotalPaid] = useState(0)

    const getData = async () => {
        try {
            await axios.get(`${serverLink}payback/summary/list`, token).then((res) => {
                if (res.data.length > 0) {
                    let rows = [];
                    res.data.map((x, i) => {
                        rows.push([
                            i + 1,
                            x.CustomerID,
                            x.ApplicationID,
                            props.branch_list.length > 0 &&
                            props.branch_list.filter(j => j.BranchCode === x.Branch)[0].BranchName,
                            x.PayBackCount,
                            <span>
                                <button className="btn btn-sm btn-primary"
                                    data-bs-target="#payback-modal"
                                    data-bs-toggle="modal"
                                    onClick={() => {
                                        setPayBackCustomerID(x.CustomerID)
                                        getPayBackDetails(x.ApplicationID)
                                    }} >
                                    View Details
                                </button>
                            </span>
                        ])
                    })
                    setData(rows);
                }
                setIsLoading(false)
            })

        } catch (e) {
            NetworkErrorAlert();
        }
    }

    const getPayBackDetails = async (ApplicationID) => {
        try {
            await axios.get(`${serverLink}payback/list/${ApplicationID}`, token).then((res) => {
                if (res.data.length > 0) {
                    setpayback(res.data);
                    let amounts = [];
                    res.data.map((x, i) => {
                        amounts.push(x.AmountPaid);
                    })
                    setTotalPaid(parseInt(amounts.reduce((a, b) => a + b, 0)))
                }
            })
        } catch (e) {

        }
    }
    useEffect(() => {
        getData();
    }, [])

    return isLoading ? (<ComponentLoader />) : (
        <div className="page-wrapper">
            <PageHeader target="modal-large" title={["Paybacks", "Loans", "Loan Payback"]} />

            <div className="page-body">
                <div className="container-xl">
                    <div className="row row-deck row-cards">

                        <ReportTable columns={columns} data={data} />

                    </div>
                </div>
            </div>

            <Modal id="payback-modal" title={'PayBack Records for ' + CustomerID} size="modal-lg" >
                <div className="ratio ratio-16x9">
                    <div className="table-responsive">
                        <table className="table table-vcenter table-hover card-table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Branch</th>
                                    <th>Amount Paid</th>
                                    <th>Payment Mode</th>
                                    <th>Payment Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    payback.length > 0 ?
                                        payback.map((x, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td width={'5px'} >{i + 1}</td>
                                                    <td>
                                                        {
                                                            props.branch_list.length > 0 &&
                                                            props.branch_list.filter(j => j.BranchCode === x.Branch)[0].BranchName
                                                        }
                                                    </td>
                                                    <td>{currencyConverter(x.AmountPaid)}</td>
                                                    <td>{x.PaymentMode}</td>
                                                    <td>{formatDateAndTime(x.InsertedDate, "date_and_time")}</td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr className="text-center">
                                            <td colSpan={7}>
                                                <h3>
                                                    No payback Record
                                                </h3>
                                            </td>
                                        </tr>
                                }
                                <tr className="h3">
                                    <td></td>
                                    <td colSpan={2} width={'5px'}>Total Payback</td>
                                    <td>{currencyConverter(totalPaid)}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </Modal>

        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        loginData: state.LoginDetails,
        branch_list: state.branch_list,
    };
};

export default connect(mapStateToProps, null)(LoanPayBacks)
