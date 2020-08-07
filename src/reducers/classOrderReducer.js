import { CONSTANTS } from "../actions";
// import { addListByID } from "../actions";
// import uuid from "uuidv4";

// console.log(uuid());

const initialState = ["class-0"];

const classOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_CLASS: {
      return [...state, `class-${action.payload.id}`];
    }

    case CONSTANTS.ADD_CLASS_WITH_LISTS: {
      // console.log("class order reducer");
      return [...state, `class-${action.payload.id_class}`];
      // addListByID(`class-${action.payload.id_class}`, "Assignments");
    }
    case CONSTANTS.DELETE_CLASS: {
      const { classID } = action.payload;
      // const newState = state;
      // const c = state[classID];
      // let count= 0;
      // state.forEach(element => {if (element.id === classID){count++;}});
      // newState.splice(count, 1);

      // return newState;
      return state.filter(c => c.id !== classID);
    }


    default:
      return state;
  }
};

export default classOrderReducer;
