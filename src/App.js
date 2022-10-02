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
import { useEffect } from 'react';


function App(props) {
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

export default connect(mapStateToProps, null)(App);