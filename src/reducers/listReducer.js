import {CONSTANTS} from '../actions'

let listID = 2;
let cardID = 6;

const initialState = [
    {
        title: "Last Episode",
        id: `list-${0}`,
        cards: [
            {
                id: `card-${0}` ,
                text: "creating a static list and a static card"
            },
            {
                id: `card-${1}`,
                text: "using material ui and other compontents"
            }
        ]
    },
    {
        title: "Current Episode",
        id: `list-${1}`,
        cards: [
            {
                id: `card-${2}`,
                text: "create first reducer"
            },
            {
                id: `card-${3}`,
                text: "render many cards"
            }, 
            {
                id: `card-${4}`,
                text: 'add css changes to index.html'
            },
            {
                id: `card-${5}`,
                text: 'just some extra info'
            }
        ]
    }


];

const listReducer = (state = initialState,action) => {
    switch (action.type) {

        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${listID}`
            }
            listID++;
            return [...state,newList]; //concatenating new list to what is already in a list
        case CONSTANTS.ADD_CARD:
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`
            }
            cardID++;
            const newState = state.map(list => {
                if(list.id === action.payload.listID){
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    };
                }else{
                    return list;
                }
            })
            return newState;
        default:
            return state;
    }

}

export default listReducer;