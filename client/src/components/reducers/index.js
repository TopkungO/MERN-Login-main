import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import {searchReducer } from "./searchReducer"
import { CartReducer } from "./CartReducer";
import {drawerReducer} from "./drawerReducer"

const rootReducer = combineReducers({
  user: userReducer,
  search:searchReducer,
  cart:CartReducer,
  drawer:drawerReducer
});

export default rootReducer
