import { CONSTANTS } from '../actions'


export const addList = (title) => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: title,
    };
};

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableleId,
    type
) => {
    return {
        type: CONSTANTS.DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableleId,
            type
        }
    }
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
    return {
      type: CONSTANTS.DELETE_LIST,
      payload: {
        listID
      }
    };
};
  