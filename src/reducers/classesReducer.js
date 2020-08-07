// import React, {Component} from 'react';
import { CONSTANTS } from "../actions";
// import { addListByID } from "../actions";

const initialState = {
  "class-0": {
    id: "class-0",
    lists: ["list-0", "list-1", "list-2"],
    title: "myclass"
  },
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

    case CONSTANTS.ADD_LIST_BY_ID: {
      const { classID, id } = action.payload;
      const c = state[classID];
      const newListID = `list-${id}`;
      const newLists = [...c.lists, newListID];
      c.lists = newLists;
      console.log("NEW LIST ADDED");

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

      // dragging lists around
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
        lists: [],
      };

      return { ...state, [newID]: newClass };
    }

    case CONSTANTS.DELETE_CLASS: {
      const { classID } = action.payload;
      const newState = state;
      delete newState[classID];
      return newState;
    }


    case CONSTANTS.EDIT_CLASS_TITLE: {
      const { classID, newTitle } = action.payload;

      const c = state[classID];
      c.title = newTitle;
      return { ...state, [classID]: c };
    }
    
    case CONSTANTS.ADD_CLASS_WITH_LISTS: {
      const { title, id_class} = action.payload;
      const newID = `class-${id_class}`;
      // const newID_list1 = `list-${id_list1}`;
      // const newID_list2 = `list-${id_list2}`;
      // const newID_list3 = `list-${id_list3}`;
      // const myLists = {
      //   newID_list1: {
      //     id: newID_list1,
      //     cards: [],
      //     title: "Assignments",
      //     class: newID
      //   },
      //   newID_list2: {
      //     id: newID_list2,
      //     cards: [],
      //     title: "Quizzes",
      //     class: newID
      //   },
      //   newID_list3: {
      //     id: newID_list3,
      //     cards: [],
      //     title: "Exams",
      //     class: newID
      //   },
      // };
      // addListByID(newID, "Assignments");
      
      const newClass = {
        id: newID,
        title,
        lists: [],
      };

      return { ...state, [newID]: newClass };

    }

    default:
      return state;
  }
};

export default classesReducer;
