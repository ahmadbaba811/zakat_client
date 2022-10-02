import React from "react";
import Header from "./components/common/header";
import NavBar from "./components/common/navbar";
import DashBoards from "./components/dashboard/dashaord";

const DashBoard=()=>{
    return(
        <div className="page">
        {/* Navbar */}
       <Header/>
       <NavBar/>
        <DashBoards/>
      </div>
    )

}

export default DashBoard;

