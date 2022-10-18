import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import {
    branch_list_reducer,
    department_list_reducer,
    designation_list_reducer,
    loan_types_reducer,
    LoginDetailsReducer,
    set_role_list_reducer,
    staff_details_reducer,

} from './reducers';
import { shortCode } from '../constants/constants'

const rootReducer = combineReducers({
    LoginDetails: LoginDetailsReducer,
    branch_list: branch_list_reducer,
    department_list: department_list_reducer,
    designation_list : designation_list_reducer,
    staff_details: staff_details_reducer,
    role_list: set_role_list_reducer,
    loan_types_list : loan_types_reducer
});

const persistConfig = {
    key: shortCode,
    storage,
};

export default persistReducer(persistConfig, rootReducer);