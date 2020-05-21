import React from 'react';
import TrelloCard from './TrelloCard';
import TrelloButton from './TrelloButton';
import {Droppable} from "react-beautiful-dnd";

//Each list has a title...

const TrelloList = ({title, cards, listID}) => {
    console.log(cards);
    return (
        <Droppable droppableId = {String(listID)}>
            {(provided)=> (
                <div {...provided.droppableProps} ref ={provided.innerRef} style={styles.container}>
                    <h4>{title}</h4>
                    {cards.map((card,index) => <TrelloCard key={card.id} index={index} text = {card.text} id = {card.id}/>)}
                    {provided.placeholder}
                    <TrelloButton listID = {listID}/>
                </div>
            )}
        </Droppable>

    )

}


const styles = {
    container: {
        backgroundColor: '#f3f3f3',
        borderRadius: 3,
        width: 300,
        height: "100%",
        padding: 8,
        marginRight: 8,
    },

};

export default TrelloList;