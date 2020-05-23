import { combineReducers } from "redux";
import listReducer from "./listReducer";
import ListOrderReducer from "./ListOrderReducer"; 
import cardReducer from "./cardReducer";

export default combineReducers({
    lists: listReducer,
    listOrder: ListOrderReducer,
    cards: cardReducer

});