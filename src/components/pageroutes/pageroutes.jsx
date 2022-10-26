import React from "react";
import { Route, Routes } from "react-router-dom";
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
import StafffReport from "../staff/staff-report/staff-report";
import StaffReportList from "../staff/staff-report-list";
import { Footer } from "../common/footer";
import CustomersList from "../kyc/customers-list";
import CustomerDetails from "../kyc/customer-details/details";
import VerifyBvn from "../kyc/verify-bvn";
import LoanRecords from "../loan/loan-records";
import LoanDetails from "../loan/loan-details";

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
                { window.scrollTo({ top: 0, behavior: 'smooth' })}
                <Route path="/" element={<DashBoards />} />
                <Route path="/dashboard" element={<DashBoards />} />

                {/* settings routes */}
                <Route path="/branch" element={<Branches />} />
                <Route path="/roles" element={<Roles />} />
                <Route path="/department" element={<Departments />} />
                <Route path="/loan-types" element={<LoanTypes />} />
                <Route path="/designations" element={<Designations />} />

                {/* staff routes */}
                <Route path="/manage-staff" element={<ManageStaff />} />
                <Route path="/staff-list" element={<StaffList />} />
                <Route path="/staff-report/:slug" element={<StafffReport />} />
                <Route path="/staff-report" element={<StaffReportList />} />

                {/* kyc routes */}
                <Route path="/customer-list" element={<CustomersList/>} />
                <Route path="/customer/:slug" element={<CustomerDetails/>} />
                <Route path="/verify-bvn" element={<VerifyBvn/>}  />

                {/* Loan Routes */}
                <Route path="/loans" element={<LoanRecords/>}  />
                <Route path="/loans/:slug" element={<LoanDetails/>} />


                <Route path="*" element={<Error404 />} />
            </Routes>

            <div className={"mt-2 mb-4"}>
                <Footer />
            </div>
        </>
    )
}
export default PageRoutes;