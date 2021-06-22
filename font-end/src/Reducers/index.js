import { combineReducers } from 'redux';
import Admin from './admin.reducer'
import Account from './account.reducer'
const myReducer = combineReducers({
    Admin,
    Account
});

export default myReducer;