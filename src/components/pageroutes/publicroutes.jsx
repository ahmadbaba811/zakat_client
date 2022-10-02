import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Login from "../auth/login";
import DashBoards from "../dashboard/dashaord";

const PublicRoutes = () => {


    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            
        </Routes>
    )
}
export default PublicRoutes;