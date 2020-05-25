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
