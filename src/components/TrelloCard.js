import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

const TrelloCard = ({text}) => {
    return (
        <Card style = {styles.card_container}>
            <CardContent>
                <Typography gutterBottom>
                    {text}
                </Typography>
            </CardContent>
        </Card>
    )
}

const styles = {
    card_container: {
        marginBottom: 8,
    }
};

export default TrelloCard;