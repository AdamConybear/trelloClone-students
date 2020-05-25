import { CONSTANTS } from "../actions";

const initialState = {
  "class-0": {
    id: "class-0",
    lists: ["list-0"],
    title: "myclass"
  }
};

const classesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST: {
      const { classID, id } = action.payload;
      const c = state[classID];
      const newListID = `list-${id}`;
      const newLists = [...c.lists, newListID];
      c.lists = newLists;
      return { ...state, [classID]: c };
    }

    case CONSTANTS.DRAG_HAPPENED: {
      const { classID } = action.payload;
      const c = state[classID];
      const lists = c.lists;
      const {
        droppableIndexEnd,
        droppableIndexStart,

        type
      } = action.payload;

      // draggin lists around
      if (type === "list") {
        const pulledOutList = lists.splice(droppableIndexStart, 1);
        lists.splice(droppableIndexEnd, 0, ...pulledOutList);
        c.lists = lists;

        return { ...state, [classID]: c };
      }
      return state;
    }
    case CONSTANTS.DELETE_LIST: {
      const { listID, classID } = action.payload;
      const c = state[classID];
      const lists = c.lists;
      const newLists = lists.filter(id => id !== listID);
      c.lists = newLists;
      return { ...state, [classID]: c };
    }

    case CONSTANTS.ADD_CLASS: {
      const { title, id } = action.payload;
      const newID = `class-${id}`;
      const newClass = {
        id: newID,
        title,
        lists: []
      };

      return { ...state, [newID]: newClass };
    }

    case CONSTANTS.DELETE_CLASS: {
      const { classID } = action.payload;
      const newState = state;
      delete newState[classID];
      return newState;
    }

    default:
      return state;
  }
};

export default classesReducer;
