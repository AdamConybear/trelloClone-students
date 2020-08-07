import { CONSTANTS } from "../actions";
import uuid from "uuidv4";

export const addList = title => {
  return (dispatch, getState) => {
    const classID = getState().activeClass;
    const id = uuid();
    dispatch({
      type: CONSTANTS.ADD_LIST,
      payload: { title, classID, id }
    });
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return (dispatch, getState) => {
    const classID = getState().activeClass;
    dispatch({
      type: CONSTANTS.DRAG_HAPPENED,
      payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        type,
        classID
      }
    });
  };
};

export const editTitle = (listID, newTitle) => {
  return {
    type: CONSTANTS.EDIT_LIST_TITLE,
    payload: {
      listID,
      newTitle
    }
  };
};

export const deleteList = listID => {
  return (dispatch, getState) => {
    const classID = getState().activeClass;
    return dispatch({
      type: CONSTANTS.DELETE_LIST,
      payload: {
        listID,
        classID
      }
    });
  };
};

export const addListByID = (classID, title) => {
  const id = uuid();
  return {
    type: CONSTANTS.ADD_LIST_BY_ID,
    payload: { title, classID, id }
  };
};

export const setList = (listID, newTitle, classID) => {
  return {
    type: CONSTANTS.SET_LIST,
    payload: {
      listID,
      newTitle,
      classID,
    }
  };
};
