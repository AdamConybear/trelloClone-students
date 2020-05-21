import {CONSTANTS} from '../actions'

let listID = 4;
let cardID = 4;

const initialState = [
    {
        title: "Assignments",
        id: `list-${0}`,
        cards: [
            {
                id: `card-${0}` ,
                text: "first assignment"
            }
        ]
    },
    {
        title: "Projects",
        id: `list-${1}`,
        cards: []
    },
    {
        title: "Quizzes",
        id: `list-${2}`,
        cards: [
            {
                id: `card-${1}`,
                text: "dynamic programming quiz"
            },
            {
                id: `card-${2}`,
                text: "leet code QUIZZES"
            }
        ]
    },
    {
        title: "Exams",
        id: `list-${3}`,
        cards: [
            {
                id: `card-${3}`,
                text: "Final Exam MY DUDE"
            },

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
        case CONSTANTS.ADD_CARD: {
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
        }
        case CONSTANTS.DRAG_HAPPENED:

            const {droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableleId,
                type} = action.payload;
            const newState = [...state];

            //lists being dragged

            if(type === 'list'){
                const list = newState.splice(droppableIndexStart,1);
                newState.splice(droppableIndexEnd, 0, ...list);
                return newState;
            }

            if(droppableIdStart === droppableIdEnd){ //same list
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd,0,...card);
            }

            //another list
            if (droppableIdStart !== droppableIdEnd){
                const listStart = state.find (list => droppableIdStart === list.id); //finds list where card is taken from
                const card = listStart.cards.splice(droppableIndexStart,1); //takes card from list
                const listEnd = state.find(list => droppableIdEnd === list.id); //finds list where card is being dropped
                listEnd.cards.splice(droppableIndexEnd, 0, ...card); // put card in new list
            }

            return newState;

        default:
            return state;
    }

}

export default listReducer;