import { combineReducers } from "redux";

import cart from "redux/slices/cart";
import login from "redux/slices/login";

const rootReducer = combineReducers({ cart, login });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
