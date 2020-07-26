import { combineReducers } from "redux";
import auth from "./auth.reducer"
import alert from "./alert.reducer";
import buta from "./buta.reducer"

export default combineReducers({ auth, alert, buta });
