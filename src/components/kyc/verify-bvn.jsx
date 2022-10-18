import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { setLoginDetails } from "../../action/action";
import { PageHeader } from "../common/pageHeader";
import ReportTable from "../common/table/report_table";
import zakat from '../../images/zakat.jpg'


const VerifyBVN = (props) => {
    const [formData, setFormData] = useState({
        Bvn: "",

    })


    const onEdit = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })

    }

    return (
        <div className="page-wrapper">
            <PageHeader title={["KYC", "Verify BVN", "Verify"]} />

            <div className="page-body">
                <div className="container-xl">
                    <div className="card h-100" style={{ maxHeight: '700px' }}>
                        <div className="col d-flex flex-column">
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card card-body">
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-6 col-xl-12">
                                                        <div className="mb-3">
                                                            <label className="form-label required" htmlFor="Bvn">Bank Verification Number</label>
                                                            <input type="text" className="form-control" id="Bvn" onChange={onEdit} required placeholder="e.g 00000000000" />
                                                        </div>
                                                    </div>

                                                    <hr />
                                                    <div className="col-md-6 col-xl-12">
                                                        <div className="mb-3">
                                                            <button className="btn btn-ghost-primary active w-50">
                                                                Verify
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <hr />
                                            <div className="mt-5">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="d-flex justify-content-center">
                                                            <img src={zakat} className="avatar avatar-xl" alt="image" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p className="h3">
                                                            First Name:
                                                        </p>
                                                        <p className="h3">
                                                            Middle Name:
                                                        </p>
                                                        <p className="h3">
                                                            Surname:
                                                        </p>
                                                        <p className="h3">
                                                            Address:
                                                        </p>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setOnLoginDetails: (p) => {
            dispatch(setLoginDetails(p));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBVN);
