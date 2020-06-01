import { combineReducers } from "redux";
import listsReducer from "./listsReducer";
import cardsReducer from "./cardsReducer";
import classesReducer from "./classesReducer";
import classOrderReducer from "./classOrderReducer";
import activeClassReducer from "./activeClassReducer";
import { REHYDRATE, PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage"; // local storage

export default combineReducers({
  lists: listsReducer,
  cards: cardsReducer,
  classes: classesReducer,
  classOrder: classOrderReducer,
  activeClass: activeClassReducer
});


// const appReducer = combineReducers({
//   /* your app’s top-level reducers */
//   lists: listsReducer,
//   cards: cardsReducer,
//   classes: classesReducer,
//   classOrder: classOrderReducer,
//   activeClass: activeClassReducer
// })

// const rootReducer = (state, action) => {

//   switch(action.type) {
//       // case PURGE: {
//       //   // storage.removeItem('persist:root')
//       //   state = undefined;

//       // }
//       // case REHYDRATE: {
//       //   return state;
//       // }
//       case RESET: {
//         return state;
//       }
//   }
  
//   return appReducer(state, action);
// };

// export default rootReducer;