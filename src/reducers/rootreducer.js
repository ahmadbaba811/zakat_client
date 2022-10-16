import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import {
    branch_list_reducer,
    LoginDetailsReducer,
    role_list_reducer,

} from './reducers';
import { shortCode } from '../constants/constants'

const rootReducer = combineReducers({
    LoginDetails: LoginDetailsReducer,
    branch_list: branch_list_reducer,
    roles_list: role_list_reducer
});

const persistConfig = {
    key: shortCode,
    storage,
};

export default persistReducer(persistConfig, rootReducer);