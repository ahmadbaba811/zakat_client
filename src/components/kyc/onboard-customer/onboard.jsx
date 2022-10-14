import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { serverLink } from "../../../constants/url";
import Loader from "../../common/loader";
import { PageHeader } from "../../common/pageHeader";
import { NetworkErrorAlert } from "../../common/sweetalert/sweetalert";
import PersonalInfo from "./personal-info";

const OnBoardCustomer = (props) => {
    const token = props.loginData[0].token;
    const [isLoading, setIsLoading] = useState(true);
    const [nav_1, setNav_1] = useState('disabled');
    const [formData, setFormData] = useState({
        CustomerID: ""
    })

    const setEnabledNav1 = () => {
        setNav_1('');
    }

    const getData = async () => {
        try {
            await axios.get(`${serverLink}customer/last_customer_id`, token).then((response) => {
                if (response.data.length > 0) {

                    const lastId = response.data[0].CustomerID;
                    const lastIndex = Number(lastId.split("CU")[1]) + 1;
                    const padStaffID = (lastIndex, places) =>
                        String(lastIndex).padStart(places, "0");
                    const new_cu_id = `CU${padStaffID(lastIndex, 4)}`;
                    setFormData({
                        ...formData,
                        CustomerID: new_cu_id
                    })
                    setIsLoading(false)
                }else{
                    setFormData({
                        ...formData,
                        CustomerID: 'CU0001'
                    })
                    setIsLoading(false)
                }
                
                
            })
        } catch (e) {
            console.log(e)
            NetworkErrorAlert();
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return isLoading ? (<Loader />) : (
        <div className="page-wrapper">
            <PageHeader title={["Onboarding", "KYC", "Onboard Customer"]} />

            <div className="page-body">
                <div className="container-xl">
                    <div className="col-md-12">
                        <div className="card">
                            <ul className="nav nav-tabs" data-bs-toggle="tabs" role="tablist" >
                                <li className="nav-item w-25" role="presentation" >
                                    <a href="#tab-personal-info" className="nav-link active" style={{ height: '70px' }} data-bs-toggle="tab" aria-selected="true" role="tab">Personal Information</a>
                                </li>
                                <li className="nav-item w-25" role="presentation">
                                    <a href="#tab-account-info" className={`nav-link ${nav_1}`} style={{ height: '70px' }} data-bs-toggle="tab" aria-selected="false" tabIndex={-1} role="tab">Account Information</a>
                                </li>
                                <li className="nav-item w-25">
                                    <a href="#tab-account-nok" className="nav-link" style={{ height: '70px' }} data-bs-toggle="tab" aria-selected="false" tabIndex={-1} role="tab">Next of Kin</a>
                                </li>
                            </ul>
                            <div className="card-body">
                                <div className="tab-content">
                                    <div className="tab-pane active show" id="tab-personal-info" role="tabpanel">
                                        <div>create account for customer, register his/her personal information</div>
                                        <PersonalInfo setEnabledNav1={setEnabledNav1} CustomerID={formData.CustomerID} />
                                    </div>
                                    <div className="tab-pane" id="tab-account-info" role="tabpanel">
                                        <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
                                    </div>
                                    <div className="tab-pane" id="tab-account-nok" role="tabpanel">
                                        <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
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
        branch_list: state.branch_list

    };
};

export default connect(mapStateToProps, null)(OnBoardCustomer);
