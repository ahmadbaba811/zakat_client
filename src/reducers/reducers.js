
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