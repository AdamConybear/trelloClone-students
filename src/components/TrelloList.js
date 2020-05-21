import React from 'react';
import TrelloCard from './TrelloCard';
import TrelloButton from './TrelloButton';
import {Droppable, Draggable} from "react-beautiful-dnd";
import styled from "styled-components"

//Each list has a title...

const ListContainer = styled.div `
    background-color: #f3f3f3;
    border-radius: 3px;
    width: 300px;
    height: 100%;
    padding: 8px;
    margin-right: 8px;

`

const TrelloList = ({title, cards, listID, index}) => {
    console.log(cards);
    return (
        <Draggable draggableId= {String(listID)} index = {index}>
            {(provided) => (
                <ListContainer {...provided.draggableProps} ref ={provided.innerRef} {...provided.dragHandleProps}>
                    <Droppable droppableId = {String(listID)}>
                        {(provided)=> (
                            <div {...provided.droppableProps} ref = {provided.innerRef}>
                                <h4>{title}</h4>
                                {cards.map((card,index) => <TrelloCard key={card.id} index={index} text = {card.text} id = {card.id}/>)}
                                {provided.placeholder}
                                <TrelloButton listID = {listID}/>
                            </div>
                        )}
                    </Droppable>
                </ListContainer>
            )}
        </Draggable>

    )

}

export default TrelloList;