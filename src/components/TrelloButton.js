import React, { Component } from "react";
import Icon from "@material-ui/core/Icon";
import Card from '@material-ui/core/Card';
import TextareaAutosize from 'react-textarea-autosize';


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
            formOpen: false
        })
    }

    handleInputChange = (event) => {
        this.setState ({
            text: event.target.value
        })
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
                <Card>
                    <TextareaAutosize
                    placeholder = {textPlaceholder}
                    autoFocus
                    onBlur = {this.closeForm}
                    value ={this.state.text}
                    onChange = {this.handleInputChange}
                    style ={{
                        resize: 'none',
                        width: "100%",
                        outline: "none",
                        border: "none"
                    }}
                    />
                </Card>
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
    }
};


export default TrelloButton;