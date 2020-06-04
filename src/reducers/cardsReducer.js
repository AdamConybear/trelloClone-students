import { CONSTANTS } from "../actions";
import moment from "moment";

const currentDate = moment().format();

const initialState = {
  "card-0": {
    text: "First Entry",
    id: `card-0`,
    list: "list-0",
    date: currentDate,
  }
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_CARD: {
      const { text, listID, id, date } = action.payload;

      const newCard = {
        text,
        id: `card-${id}`,
        list: listID,
        date,
      };

      return { ...state, [`card-${id}`]: newCard };
    }
    case CONSTANTS.EDIT_CARD_TITLE: {
      const { id, newText } = action.payload;
      const card = state[id];
      card.text = newText;
      // card.date = newDate;
      return { ...state, [`card-${id}`]: card };
    }

    case CONSTANTS.EDIT_CARD_DATE: {
      const { id, newDate } = action.payload;
      const card = state[id];
      card.date = newDate;
      return { ...state, [`card-${id}`]: card };
    }

    case CONSTANTS.DELETE_CARD: {
      const { id } = action.payload;
      const newState = state;
      delete newState[id];
      return newState;
    }
    default:
      return state;
  }
};

export default cardsReducer;
