import { CONSTANTS } from "../actions";
import uuid from "uuidv4";

export const addCard = (listID, text, date) => {
  const id = uuid();
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { text, listID, id, date }
  };
};

export const editCardTitle = (id, listID, newText) => {
  return {
    type: CONSTANTS.EDIT_CARD_TITLE,
    payload: { id, listID, newText }
  };
};

export const editCardDate = (id, listID, newDate) => {
  return {
    type: CONSTANTS.EDIT_CARD_DATE,
    payload: { id, listID, newDate }
  };
};

export const deleteCard = (id, listID) => {
  return {
    type: CONSTANTS.DELETE_CARD,
    payload: { id, listID }
  };
};
