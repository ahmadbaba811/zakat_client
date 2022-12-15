import { shortCode } from "../constants/constants";

export const LoginDetailsReducer = (state = [], action) => {
    switch (action.type) {
      case `SET_${shortCode}_ZKT_LOGIN_DETAILS`:
        return action.payload;
      default:
        return state;
    }
  };

  
export const branch_list_reducer = (state = [], action) => {
  switch (action.type) {
    case `SET_${shortCode}_ZKT_BRANCH_LIST`:
      return action.payload;
    default:
      return state;
  }
};

export const department_list_reducer = (state = [], action) => {
  switch (action.type) {
    case `SET_${shortCode}_DEPARTMENT_LIST`:
      return action.payload;
    default:
      return state;
  }
};

export const designation_list_reducer = (state=[], action)=>{
  switch (action.type) {
    case  `SET_${shortCode}_DESIGNATION_LIST`:
      return action.payload;  
    default:
      return state
  }
}
export const staff_details_reducer = (state=[], action)=>{
  switch (action.type) {
    case  `SET_${shortCode}_STAFF_DETAILS`:
      return action.payload;  
    default:
      return state
  }
}
export const set_role_list_reducer = (state=[], action)=>{
  switch (action.type) {
    case  `SET_${shortCode}_ROLE_LIST`:
      return action.payload;  
    default:
      return state
  }
}

export const loan_types_reducer = (state=[], action)=>{
  switch (action.type) {
    case  `SET_${shortCode}_LOAN_TYPES_LIST`:
      return action.payload;  
    default:
      return state
  }
}


export const customer_details_reducer = (state=[], action)=>{
  switch (action.type) {
    case  `SET_${shortCode}_CUSTOMER_DETAILS`:
      return action.payload;  
    default:
      return state
  }
}