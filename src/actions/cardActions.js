import { CONSTANTS } from '../actions'
import {uuid} from "uuidv4"; //universaly unique identifier

//listID tells us which list to add card to
export const addCard = (listID,text) => {
    const id = uuid();
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {text, listID, id},
    };
};

export const editCard = (id, listID, newText) => {
    return {
        type: CONSTANTS.EDIT_CARD,
        payload: { id, listID, newText }
    };
};
  
export const deleteCard = (id, listID) => {
    return {
        type: CONSTANTS.DELETE_CARD,
        payload: { id, listID }
    };
};
  