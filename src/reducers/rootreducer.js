import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import {
    LoginDetailsReducer,

} from './reducers';
import { shortCode } from '../constants/constants'

const rootReducer = combineReducers({
    LoginDetails: LoginDetailsReducer
});

const persistConfig = {
    key: shortCode,
    storage,
};

export default persistReducer(persistConfig, rootReducer);