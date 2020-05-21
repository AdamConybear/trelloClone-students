import { CONSTANTS } from '../actions'

//listID tells us which list to add card to
export const addCard = (listID,text) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {text, listID},
    };
};