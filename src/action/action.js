
export const setLoginDetails = (p) => {
  return {
    type: `SET_ZKT_LOGIN_DETAILS`,
    payload: p,
  };
};


export const setBranchList = (p) => {
  return {
    type: `SET_ZKT_BRANCH_LIST`,
    payload: p,
  };
};

export const setDepartmentList=(p)=>{
  return{
    type:`SET_DEPARTMENT_LIST`,
    payload: p,
  }
}

export const setDesignationList =(p)=>{
  return{
    type: `SET_DESIGNATION_LIST`,
    payload: p,
  }
}

export const setStaffDetails =(p)=>{
  return{
    type: `SET_STAFF_DETAILS`,
    payload: p,
  }
}