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


const AllTransactions = (props) => {
    const token = props.loginData[0].token
    const [isLoading, setIsLoading] = useState(true)

    const [payback, setpayback] = useState([]);
    const columns = ["ID", "CustomerID", "Account No", "Transaction No", "Type", "Amount", "Date", "Status"];
    const [data, setData] = useState([]);


    const getData = async () => {
        try {
            await axios.get(`${serverLink}customer/transactions/${props.loginData[0]?.Branch}`, token).then((res) => {
                if (res.data.length > 0) {
                    let rows = [];
                    res.data.map((x, i) => {
                        rows.push([
                            i + 1,
                            x.CustomerID,
                            x.AccountNo,
                            x.TransactionNo,
                            x.TransactionType,
                            currencyConverter(x.TransactionAmount),
                            formatDateAndTime(x.TransactionDate, "date"),
                            props.branch_list.length > 0 &&
                            props.branch_list.filter(j => j.BranchCode === x.TransactionBranch)[0].BranchName,
                            x.PayBackCount,
                            <span className={x.TransactionStatus === 0 ? "Successful" : "Failed"} >
                                {x.TransactionStatus}
                            </span>
                        ])
                    })
                    setData(rows);
                }
                setIsLoading(false)
            })

        } catch (e) {
            console.log(e)
            NetworkErrorAlert();
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return isLoading ? (<ComponentLoader />) : (
        <div className="page-wrapper">
            <PageHeader target="modal-large" title={["Transactions", "Transaction", "All Transactions"]} />

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
        branch_list: state.branch_list,
    };
};

export default connect(mapStateToProps, null)(AllTransactions)
