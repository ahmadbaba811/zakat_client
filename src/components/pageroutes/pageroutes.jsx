import React, { useEffect } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Header from "../common/header";
import DashBoards from "../dashboard/dashaord";

const PageRoutes = () => {
    // useEffect(()=>{
    //     document.getElementById("head").scrollTop();
    //   },[])


    return (
        <>
        <Header/>
        <Routes>
            <Route path="/" element={<DashBoards />} />
            <Route path="/dashboard" element={<DashBoards />} />
        </Routes></>
    )
}
export default PageRoutes;