
export const LoginDetailsReducer = (state = [], action) => {
    switch (action.type) {
      case `SET_ZKT_LOGIN_DETAILS`:
        return action.payload;
      default:
        return state;
    }
  };