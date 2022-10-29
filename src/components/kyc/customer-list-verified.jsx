import axios from "axios";
import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { setLoginDetails } from "../../action/action";
import Loader from "../common/loader";
import { serverLink } from '../../constants/url'
import { useEffect } from "react";
import Modal from "../common/modal/modal";
import ReportTable from "../common/table/report_table";
import { toast } from "react-toastify";
import { NetworkErrorAlert } from "../common/sweetalert/sweetalert";
import { PageHeader } from "../common/pageHeader";
import { Link } from "react-router-dom";
import zakat from '../../images/zakat.jpg'
import { nigerianStates } from 'nigerian-states-and-lgas';
import { Audit, formatDate } from "../../constants/constants";


const VerifiedCustomersList = (props) => {
    const token = props.loginData[0].token;

    const [isLoading, setIsLoading] = useState(true);
    const columns = ["SN", "CustomerID", "Full Name", "Email", "Phone", "Gender", "Status", "Passport", "Action"];
    const [data, setData] = useState([]);
    const [customerList, setcustomerList] = useState([]);

    const statesLga = nigerianStates.all()
    const [imageSrc, setimageSrc] = useState({
        Passport: ""
    })
    const [img, setImg] = useState('')
    const [lgaList, setLgaList] = useState([]);

    const [formData, setFormData] = useState({
        ID: "",
        CustomerID: "",
        FirstName: "",
        MiddleName: "",
        Surname: "",
        Email: "",
        Phone: "",
        Bvn: "",
        BvnStatus: "",
        StateOfOrigin: "",
        Lga: "",
        City: "",
        Address: "",
        LandMark: "",
        InsertedBy: props.loginData[0].StaffID,
        Status: 1,
        Passport: "",
        DateOfBirth: "",
        Gender: "",
        Bvn: "",
        Branch: props.loginData[0].Branch
    })


    const getData = async () => {
        try {
            await axios.get(`${serverLink}customer/verified-customer/list`, token).then((res) => {
                if (res.data.length > 0) {
                    let rows = [];
                    res.data.map((x, i) => {
                        rows.push([
                            i + 1,
                            x.CustomerID,
                            <Link to={`/customer/${x.CustomerID}`} >{x.FirstName + " " + x.MiddleName + " " + x.Surname}</Link>,
                            x.Email,
                            x.Phone,
                            <label className={x.Gender === "Male" ? "badge bg-success" : "badge bg-info"}>
                                {x.Gender}
                            </label>,
                            <label className={x.Status === 1 ? "badge bg-success" : "badge bg-danger"}>
                                {x.Status === 1 ? "Active" : "InActive"}
                            </label>,
                            <img
                                src={
                                    x.Passport === "" ? zakat : `${serverLink}public/uploads/customer/${x.Passport}`
                                }
                                style={{ maxWidth: '60px' }} />,
                            (<button className="btn btn-sm btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-large"
                                onClick={() => {
                                    setLgaList(statesLga.filter(j => j.state === x.StateOfOrigin)[0].lgas);
                                    setImg(x.Passport)
                                    setFormData({
                                        ...formData,
                                        ID: x.ID,
                                        CustomerID: x.CustomerID,
                                        FirstName: x.FirstName,
                                        MiddleName: x.MiddleName,
                                        Surname: x.Surname,
                                        Email: x.Email,
                                        Phone: x.Phone,
                                        Bvn: x.Bvn,
                                        StateOfOrigin: x.StateOfOrigin,
                                        Lga: x.Lga,
                                        City: x.City,
                                        Address: x.Address,
                                        LandMark: x.LandMark,
                                        DateOfBirth: formatDate(x.DateOfBirth),
                                        Gender: x.Gender,
                                        Bvn: x.Bvn,
                                    })
                                    setimageSrc({
                                        ...imageSrc,
                                        Passport: x.Passport,
                                    })

                                }}
                            >
                                Edit

                            </button>
                            )

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


    useEffect(() => {
        getData();
    }, [])


    return isLoading ? (<Loader />) : (
        <div className="page-wrapper">
            <PageHeader target="modal-large" title={["KYC", "Customer", "Verified Customers"]}  />

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

const mapDispatchToProps = (dispatch) => {
    return {
        setOnLoginDetails: (p) => {
            dispatch(setLoginDetails(p));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifiedCustomersList);
