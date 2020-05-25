import { CONSTANTS } from "../actions";

const initialState = null;

const activeClassReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.SET_ACTIVE_CLASS: {
      return action.payload;
    }

    default:
      return state;
  }
};

export default activeClassReducer;
