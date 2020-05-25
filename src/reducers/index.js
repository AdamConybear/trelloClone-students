import { combineReducers } from "redux";
import listsReducer from "./listsReducer";
import cardsReducer from "./cardsReducer";
import classesReducer from "./classesReducer";
import classOrderReducer from "./classOrderReducer";
import activeClassReducer from "./activeClassReducer";

export default combineReducers({
  lists: listsReducer,
  cards: cardsReducer,
  classes: classesReducer,
  classOrder: classOrderReducer,
  activeClass: activeClassReducer
});
