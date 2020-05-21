
const initialState = [
    {
        title: "Last Episode",
        id: 0,
        cards: [
            {
                id: 0,
                text: "creating a static list and a static card"
            },
            {
                id: 1,
                text: "using material ui and other compontents"
            }
        ]
    },
    {
        title: "Current Episode",
        id: 1,
        cards: [
            {
                id: 0,
                text: "create first reducer"
            },
            {
                id: 1,
                text: "render many cards"
            }, 
            {
                id: 2,
                text: 'add css changes to index.html'
            }
        ]
    }


];

const listReducer = (state = initialState,action) => {
    switch (action.type) {
        default:
            return state;
    }

}

export default listReducer;