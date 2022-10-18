import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { decryptData, encryptData } from "../../../constants/constants";
import { serverLink } from "../../../constants/url";
import zakat from '../../../images/zakat.jpg'
import Loader from "../../common/loader";
import ComponentLoader from "../../common/modal/component-loader";
import Modal from "../../common/modal/modal";
import { NetworkErrorAlert, showAlert } from "../../common/sweetalert/sweetalert";
import CustomerOverview from "./overview";

const CustomerDetails = (props) => {
    const params = useLocation();
    const customerID = params.pathname.split("/")[2]

    const [isLoading, setIsLoading] = useState(false)
    const token = props.loginData[0].token
    const [bvn, setBvn] = useState('')



    const [customer, setCustomer] = useState([])

    const getData = async () => {
        await axios.get(`${serverLink}customer/personal_details/${customerID}`, token).then((res) => {
            if (res.data.length > 0) {
                setBvn(res.data[0]?.Bvn)
                setCustomer(res.data);
            }
            setIsLoading(false)
        })
    }
    useEffect(() => {
        getData();
    }, [])

    const onEdit = (e) => {

    }

    const veryfyBVN = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${serverLink}customer/verify_bvn`, { Bvn: bvn, CustomerID: customerID }, token).then((res) => {
                if (res.data.message === 'success') {
                    getData();
                    document.getElementById("Close").click();
                    toast.success('BVN verified');
                } else if (res.data.message === 'no record') {
                    toast.error('BVN is Invalid')
                } else {
                    toast.error('network error...')
                }
            })

        } catch (e) {
            NetworkErrorAlert()
        }

    }

    return isLoading ? (<Loader />) : (
        <div className="page-body">
            <div className="container-xl">
                <div className="card">
                    <div className="col d-flex flex-column">
                        <div className="card-body">
                            {
                                customer.length > 0 ?
                                    <div className="row">
                                        <div className="d-flex justify-content-between">
                                            <h2 className="mb-4">{customer[0].Surname} {customer[0].MiddleName} {customer[0].FirstName}</h2>
                                            <div className="row g-2 align-items-center">
                                                <div className="col-6 col-sm-4 col-md-2 col-xl py-3">
                                                    <a href="#" data-bs-toggle="modal" data-bs-target="#bvn-modal" className="btn btn-outline-primary w-100">
                                                        Verifiy BVN
                                                    </a>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-6">

                                                    <div className="card-link" href="#">
                                                        <div className="card-cover card-cover-blurred text-center" style={{
                                                            backgroundImage: `url(${customer[0]?.Passport === "" ?
                                                                zakat : `${serverLink}public/uploads/customer/${customer[0]?.Passport}`})`
                                                        }} >
                                                            <span className="avatar avatar-xl" style={{
                                                                backgroundImage: `url(${customer[0]?.Passport === "" ?
                                                                    zakat : `${serverLink}public/uploads/customer/${customer[0]?.Passport}`})`
                                                            }} ></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <p className="h3">
                                                        Branch: {props.branch_list.length > 0 &&
                                                            props.branch_list.filter(x => x.BranchCode.trim() === customer[0].Branch.trim())[0].BranchName}
                                                    </p>
                                                    <address className="h4">
                                                        Email: {customer[0].Email.trim()}<br />
                                                        Phone: {customer[0].Phone.trim()}<br />
                                                        Gender: {customer[0].Gender.trim()}<br />
                                                        BVN: {customer[0].Bvn.trim()}
                                                    </address>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-6 text-start">
                                                    <p className="h3">Account Status</p>
                                                    <p> Account Status: <label
                                                        className={customer[0]?.Status === 1 ? 'badge bg-success' : 'badge bg-danger'}>
                                                        {customer[0]?.Status === 1 ? 'Active' : 'InActive'}
                                                    </label>
                                                    </p>
                                                    <p>BVN Status: <label
                                                        className={customer[0]?.BvnStatus === 1 ? 'badge bg-success' : 'badge bg-danger'}>
                                                        {customer[0]?.BvnStatus === 1 ? 'Veified' : 'Not Verified'}
                                                    </label>
                                                    </p>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <p className="h3">Address</p>
                                                    <address>
                                                        {customer[0]?.LandMark.trim()} <br />
                                                        {customer[0]?.Address.trim()}<br />
                                                        {customer[0]?.Lga.trim()}<br />
                                                        {customer[0]?.StateOfOrigin.trim()} State<br />
                                                    </address>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <ComponentLoader />
                            }


                            <div className="container-xl">
                                <ul className="nav nav-bordered mb-4" data-bs-toggle="tabs" role="tablist">
                                    <li className="nav-item w-5" role="presentation">
                                        <a href="#tabs-home-w" className="nav-link active" data-bs-toggle="tab" aria-selected="true" role="tab">Home</a>
                                    </li>
                                    <li className="nav-item w-5" role="presentation">
                                        <a href="#tabs-home-ww" className="nav-link" data-bs-toggle="tab" aria-selected="false" tabIndex={-1} role="tab">Accounts</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a href="#tabs-home-ww" className="nav-link" data-bs-toggle="tab" aria-selected="false" tabIndex={-1} role="tab">Transactions</a>
                                    </li>
                                    <li className="nav-item w-5" role="presentation">
                                        <a href="#tabs-home-ww" className="nav-link" data-bs-toggle="tab" aria-selected="false" tabIndex={-1} role="tab">Loans</a>
                                    </li>
                                    <li className="nav-item w-5" role="presentation">
                                        <a href="#tabs-home-ww" className="nav-link" data-bs-toggle="tab" aria-selected="false" tabIndex={-1} role="tab">Paybacks</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a href="#tabs-home-ww" className="nav-link" data-bs-toggle="tab" aria-selected="false" tabIndex={-1} role="tab">Next of Kin</a>
                                    </li>
                                </ul>
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="tab-pane active show" id="tabs-home-w" role="tabpanel">
                                            <CustomerOverview />

                                        </div>
                                        <div className="tab-pane" id="tabs-profile-ww" role="tabpanel">
                                            <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <Modal id="bvn-modal" size="modal-sm" title="Verify BVN">
                                <form onSubmit={veryfyBVN}>
                                    <div className="col-md-6 col-xl-12">
                                        <div className="mb-3">
                                            <label className="form-label required">BVN</label>
                                            <input type="text" disabled className="form-control" onChange={onEdit} value={bvn} required placeholder="BVN Number" />
                                        </div>

                                        <div className="mb-3">
                                            <button type="submit" className="btn bt-sm btn-primary w-100">
                                                Verify
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </Modal>
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

export default connect(mapStateToProps, null)(CustomerDetails)