import { CONSTANTS } from "../actions";

const initialState = ["list-0"];

const listOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST: {

      const {id} = action.payload;
      const newID = `list-${id}`;
      return [...state, newID];
    }
    case CONSTANTS.DRAG_HAPPENED: {
      const {
        droppableIndexEnd,
        droppableIndexStart,
        type
      } = action.payload;
      const newState = state;

      // dragging lists around
      if (type === "list") {
        const pulledOutList = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...pulledOutList);
        return newState;
      }
      return state;
    }
    case CONSTANTS.DELETE_LIST: {
      const { listID } = action.payload;
      const newLists = state.filter(id => id !== listID);
      return newLists;
    }
    default:
      return state;
  }
};

export default listOrderReducer;
