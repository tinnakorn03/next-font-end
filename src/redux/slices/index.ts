import {combineReducers} from '@reduxjs/toolkit'
import user from './userSlice'; 
import order from './orderSlice'

const rootReducer = combineReducers({  
    user, 
    order,
});


export default rootReducer;
