import axios from "axios";
import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { serverLink } from '../../constants/url'
import { setLoginDetails } from "../../action/action";
import { toast } from "react-toastify";
import { encryptData } from "../../constants/constants";
import { useEffect } from "react";
import Logo from '../../images/zakat.jpg'

const Login = (props) => {
    let [passwordType, setPasswordType] = useState(true);
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        Email: "",
        StaffID: "",
        Password: "",
        IPAddress: "",
        State: "",
        Country: "",
        Location: ""

    })

    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setFormData({
            ...formData,
            IPAddress: res.data.IPv4,
            Country: res.data.country_name,
            State: res.data.state,
            Location: `${res.data.city}  ` + "-" + `long: ${res.data.longitude}  ` + "-" + `lat: ${res.data.latitude}  `,
        })
        //setIP(res.data.IPv4)
    }

    useEffect(() => {
        getData();
    }, [])

    const ChangePtype = () => {
        let val;
        if (passwordType === true) {
            val = false
        } else { val = true }
        setPasswordType(val)
    }

    const onEdit = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const Login = async (e) => {
        const dt = {
            Email: formData.Email,
            StaffID: formData.StaffID,
            Password: encryptData(formData.Password),
            IPAddress: formData.IPAddress,
            State: formData.State,
            Country: formData.Country,
            Location: formData.Location,
            SessionID: Math.floor(Math.random() * 10000000)
        }
        e.preventDefault();
        toast.info('please wait...')
        await axios.post(`${serverLink}login/staff_login`, dt).then((res) => {
            if (res.data.status === 200) {
                window.localStorage.setItem("tablerTheme", "light")
                toast.success('login successful')
                setTimeout(() => {
                    props.setOnLoginDetails(res.data.UserDetails);
                    window.location.href = "/dashboard"
                    setLoading(false);
                }, 1000);
            } else {
                setLoading(false);
                toast.error('wrong login credetials...')
            }

        })

        // setTimeout(() => {
        //                 props.setOnLoginDetails([{FullName:'IDRIS AHMAD', Email:'ahmadub81@gmail.com', Designation:'Branch Manager', BranchName:'Ikeja', Passport:'https://img.freepik.com/premium-vector/portrait-young-man-with-beard-hair-style-male-avatar-vector-illustration_266660-423.jpg?w=2000'}]);
        //                 setLoading(false);
        //             }, 2000);



    }

    return (
        <div className="col-md-4 offset-lg-4">
            <div className="border-top-wide border-primary d-flex flex-column">
                <div className="page page-center">
                    <div className="d-flex justify-content-center">
                        <div className="container container-tight py-4">
                            <div className="text-center mb-4">
                                <a href="." className="navbar-brand navbar-brand-autodark">
                                    <img src={Logo} width="100px" alt="" />
                                </a>
                            </div>
                            <div className="card card-md">
                                <div className="card-body">
                                    <h2 className="h2 text-center mb-4">Login to your account</h2>
                                    <form noValidate={false} onSubmit={Login}>
                                        <div className="mb-3">
                                            <label className="form-label">User ID</label>
                                            <input
                                                id={"StaffID"}
                                                onChange={onEdit}
                                                type="text"
                                                className="form-control"
                                                placeholder="your@email.com"
                                                autoComplete="off"
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">
                                                Password
                                                <span className="form-label-description">
                                                    <a href="./forgot-password.html">I forgot password</a>
                                                </span>
                                            </label>
                                            <div className="input-group input-group-flat">
                                                <input
                                                    id="Password"
                                                    required
                                                    onChange={onEdit}
                                                    type={passwordType === true ? 'password' : 'text'}
                                                    className="form-control"
                                                    placeholder="Your password"
                                                    autoComplete="off"
                                                />
                                                <span className="input-group-text">
                                                    <span
                                                        onClick={ChangePtype}
                                                        className="link-secondary"
                                                        title="Show password"
                                                        data-bs-toggle="tooltip"
                                                    >
                                                        {/* Download SVG icon from http://tabler-icons.io/i/eye */}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="icon"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={2}
                                                            stroke="currentColor"
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                            <circle cx={12} cy={12} r={2} />
                                                            <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                                                        </svg>
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-check">
                                                <input type="checkbox" className="form-check-input" />
                                                <span className="form-check-label">
                                                    Remember me on this device
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-footer">
                                            <button type="submit" className="btn btn-primary w-100">
                                                Sign in
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                {/* <div className="hr-text">or</div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <a href="#" className="btn btn-white w-100">
                                                <img src="https://img.icons8.com/color/25/000000/google-logo.png" />
                                                Login with Gmail
                                            </a>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            {/* <div className="text-center text-muted mt-3">
                                Don't have account yet?{" "}
                                <Link to="/register" tabIndex={-1}>
                                    Sign up
                                </Link>
                            </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
