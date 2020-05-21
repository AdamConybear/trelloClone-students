import React from 'react';
import TrelloCard from './TrelloCard';
import TrelloButton from './TrelloButton';

//Each list has a title...

const TrelloList = ({title, cards}) => {
    return (
        <div style={styles.container}>
            <h4>{title}</h4>
            {cards.map(card => <TrelloCard key={card.id} text = {card.text}/>)}
            <TrelloButton />
        </div>

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