import React, { Component } from "react";
import Icon from "@material-ui/core/Icon";
import Card from '@material-ui/core/Card';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {addList, addCard} from '../actions'


class TrelloButton extends Component {

    state = {
        formOpen: false,
        text: ""
    }

    openForm = () => {
        this.setState ({
            formOpen: true
        })
    }
    closeForm = () => {
        this.setState ({
            text: "",
            formOpen: false
        })
    }

    handleInputChange = (event) => {
        this.setState ({
            text: event.target.value
        })
    }

    handleAddList = () => {
        const {dispatch} = this.props;
        const {text} = this.state;
        if (text) {
            this.setState ({
                text: "",
            })
            dispatch(addList(text));
        }
        return;
    }

    handleAddCard = () => {
        const {dispatch, listID} = this.props;
        const {text} = this.state;
        if (text) {
            this.setState ({
                text: "",
            })
            dispatch(addCard(listID,text));
        }
        return;
    }
    handleKeyPress = (event) => {
        const {list} = this.props;

        if(event.key === 'Enter'){
            list ? this.handleAddList() : this.handleAddCard()   
        }
    }

    renderAddButton = () => {
        const {list} = this.props;

        const buttonText = list ? "Add another list" : "Add another card";
        const buttonTextOpacity =list ? 1 : 0.5;
        const buttonTextColor = list ? "white" : "inherit";
        const buttonBackground = list ? "rgba(0,0,0,.15)" : "inherit";

        return (
            <div 
            onClick = {this.openForm}
            style={{
                ...styles.buttonContainer,
                opacity: buttonTextOpacity,
                color: buttonTextColor,
                backgroundColor: buttonBackground
                }}>
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </div>

        )
    }
    renderForm = () => {

        const {list} = this.props;

        const textPlaceholder = list ? "Enter list title..." : "Enter a title for this card..." ;
        const buttonTitle = list ? "Add List" : "Add Card" ;

        return (
            <div>
                <Card style={{
                    // overflow: "visible",
                    minHeight: 80,
                    minWidth: 272,
                    padding: '6px 8px 2px'
                }}>
                    <TextareaAutosize
                    placeholder = {textPlaceholder}
                    autoFocus
                    onKeyPress={this.handleKeyPress}
                    onBlur = {this.closeForm}
                    value ={this.state.text}
                    onChange = {this.handleInputChange}
                    style ={{
                        resize: 'none',
                        overflow: "hidden",
                        width: "100%",
                        outline: "none",
                        border: "none"
                    }}
                    />
                </Card>
                <div style={styles.formButton}>
                    <Button 
                    onMouseDown = {list ? this.handleAddList : this.handleAddCard }
                    variant = "contained" 
                    style={{color:"white", backgroundColor: "#86c232"}}> 
                    {buttonTitle} 
                    </Button>
                    <Icon onClick = {this.closeForm} style= {{marginLeft: 8, cursor: "pointer"}}>close</Icon>
                </div>
            </div>
        )
    }


    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();

    }
}

const styles = {
    buttonContainer: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10,
    },
    formButton: {
        marginTop: 8,
        display: "flex",
        alignItems: 'center'

    }
};


export default connect()(TrelloButton);