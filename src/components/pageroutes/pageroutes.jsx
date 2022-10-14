import React, { useEffect } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Header from "../common/header";
import DashBoards from "../dashboard/dashaord";
import NaviagtionTab from "../common/navbar";
import Error404 from "../common/error404";
import { useState } from "react";
import Branches from "../settings/branches";
import Departments from "../settings/departments";
import Roles from "../settings/roles";
import LoanTypes from "../settings/loan-types";
import ManageStaff from "../staff/manage-staff";
import Designations from "../settings/designations";
import StaffList from "../staff/staff-list";
import OnBoardCustomer from "../kyc/onboard-customer/onboard";

const PageRoutes = () => {
    // useEffect(()=>{
    //     document.getElementById("head").scrollTop();
    //   },[])

    const [overlap, setOverLap] = useState("navbar navbar-expand-md navbar-light d-print-none")
    const [sticky, setSticky] = useState("")
    const Sticky = () => {
        if (sticky === "") { setSticky("sticky-top") } else { setSticky("") }

    }
    const Overlap = () => {
        const ov = "navbar navbar-expand-md navbar-dark navbar-overlap d-print-none";
        setOverLap(ov)

    }

    return (
        <>
            <div className={"sticky-top"}>
                <Header overlap={overlap} />
                <NaviagtionTab Overlap={Overlap} Sticky={Sticky} />
            </div>

            <Routes>
                <Route path="/" element={<DashBoards />} />
                <Route path="/dashboard" element={<DashBoards />} />

                {/* settings routes */}
                <Route path="/branch" element={<Branches />} />
                <Route path="/roles" element={<Roles/>} />
                <Route path="/department" element={<Departments />} />
                <Route path="/loan-types" element={<LoanTypes/>} />
                <Route path="/designations" element={<Designations/>} />
                
                {/* staff routes */}
                <Route path="/manage-staff" element={<ManageStaff/>} />
                <Route path="/staff-list" element={<StaffList/>} />

                {/* kyc routes */}
                <Route path="/onboard-customer" element={<OnBoardCustomer/>} />


                <Route path="*" element={<Error404 />} />
            </Routes></>
    )
}
export default PageRoutes;