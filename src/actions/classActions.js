import { CONSTANTS } from "../actions";
import uuid from "uuidv4";

export const setActiveClass = id => {
  return {
    type: CONSTANTS.SET_ACTIVE_CLASS,
    payload: id
  };
};

export const addClass = title => {
  const id = uuid();
  return {
    type: CONSTANTS.ADD_CLASS,
    payload: { title, id }
  };
};

export const deleteClass = (classID) => {
  return {
    type: CONSTANTS.DELETE_CLASS,
    payload: { classID }
  };
};

export const editClassTitle = (classID, newTitle) => {
  return {
    type: CONSTANTS.EDIT_CLASS_TITLE,
    payload: { classID, newTitle }
  };
};

export const addClassWithLists = (title) => {
  const id_class = uuid();
  const id_list1 = uuid();
  const id_list2 = uuid();
  const id_list3 = uuid();

  return {
    type: CONSTANTS.ADD_CLASS_WITH_LISTS,
    payload: {title, id_class, id_list1, id_list2, id_list3}

  }


}