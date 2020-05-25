import { CONSTANTS } from "../actions";
import uuid from "uuidv4";

console.log(uuid());

const initialState = ["class-0"];

const classOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_CLASS: {
      return [...state, `class-${action.payload.id}`];
    }
    default:
      return state;
  }
};

export default classOrderReducer;
