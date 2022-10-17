import logo from './logo.svg';
import './App.css';
import DashBoard from './dashbaord';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { Dashboard } from '@mui/icons-material';
import PageRoutes from './components/pageroutes/pageroutes';
import PublicRoutes from './components/pageroutes/publicroutes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverLink } from './constants/url';
import { setRoleList } from './action/action';


function App(props) {
  const token = props.loginData[0]?.token;
  const [roles, setRoles]=useState([]);

  const getRoles = async()=>{
    if(token !== ''){
      await axios.get(`${serverLink}settings/roles/list`, token).then((res)=>{
        if(res.data.length > 0) {
            setRoles(res.data)
        }
    })
    }
    
  }

  useEffect(()=>{
    getRoles();
  }, []);

  return (
    <div className="" id="aa">
      <Router>
        {props.loginData.length < 1 ? <PublicRoutes /> : <PageRoutes />}
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <ToastContainer />

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loginData: state.LoginDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      setOnLoginDetails: (p) => {
          dispatch(setRoleList(p));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);