
export const LoginDetailsReducer = (state = [], action) => {
    switch (action.type) {
      case `SET_ZKT_LOGIN_DETAILS`:
        return action.payload;
      default:
        return state;
    }
  };

  
export const branch_list_reducer = (state = [], action) => {
  switch (action.type) {
    case `SET_ZKT_BRANCH_LIST`:
      return action.payload;
    default:
      return state;
  }
};

export const department_list_reducer = (state = [], action) => {
  switch (action.type) {
    case `SET_DEPARTMENT_LIST`:
      return action.payload;
    default:
      return state;
  }
};

export const designation_list_reducer = (state=[], action)=>{
  switch (action.type) {
    case  `SET_DESIGNATION_LIST`:
      return action.payload;  
    default:
      return state
  }
}
export const staff_details_reducer = (state=[], action)=>{
  switch (action.type) {
    case  `SET_STAFF_DETAILS`:
      return action.payload;  
    default:
      return state
  }
}