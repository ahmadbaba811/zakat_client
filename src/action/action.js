import { shortCode } from "../constants/constants";

export const setLoginDetails = (p) => {
  return {
    type: `SET_${shortCode}_ZKT_LOGIN_DETAILS`,
    payload: p,
  };
};


export const setBranchList = (p) => {
  return {
    type: `SET_${shortCode}_ZKT_BRANCH_LIST`,
    payload: p,
  };
};

export const setDepartmentList=(p)=>{
  return{
    type:`SET_${shortCode}_DEPARTMENT_LIST`,
    payload: p,
  }
}

export const setDesignationList =(p)=>{
  return{
    type: `SET_${shortCode}_DESIGNATION_LIST`,
    payload: p,
  }
}

export const setStaffDetails =(p)=>{
  return{
    type: `SET_${shortCode}_STAFF_DETAILS`,
    payload: p,
  }
}
export const setRoleList =(p)=>{
  return{
    type: `SET_${shortCode}_ROLE_LIST`,
    payload: p,
  }
}


export const setLoanTypes =(p)=>{
  return{
    type: `SET_${shortCode}_LOAN_TYPES_LIST`,
    payload: p,
  }
}

export const setCustomerDetails =(p)=>{
  return{
    type: `SET_${shortCode}_CUSTOMER_DETAILS`,
    payload: p,
  }
}
