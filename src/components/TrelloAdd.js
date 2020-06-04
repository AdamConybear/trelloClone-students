import React from "react";
import TrelloButton from "./TrelloButton";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";
import TrelloForm from "./TrelloForm";
import TrelloOpenForm from "./TrelloOpenForm";
import moment from "moment";

class TrelloAdd extends React.PureComponent {
  state = {
    formOpen: false,
    text: "",
  };

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  closeForm = e => {
    this.setState({
      formOpen: false
    });
  };

  handleTextChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleDateChange = e => {
    this.setState({
      date: e.target.value
    });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: ""
      });
      dispatch(addList(text));
    }

  };

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state;
    const currentDate = moment().format();
    // console.log(currentDate);
  

    if (text) {
      this.setState({
        text: "",
      });
      // console.log("adding a new card with date: " + currentDate);
      dispatch(addCard(listID, text, currentDate));
    }
  };

  render() {
    const { text } = this.state;
    const { list } = this.props;
    // console.log(list);
    return this.state.formOpen ? (
      <TrelloForm
        text={text}
        onTextChange={this.handleTextChange}
        closeForm={this.closeForm}
        list={list}
      >
        <TrelloButton onClick={list ? this.handleAddList : this.handleAddCard}>
          {list ? "Add List" : "Add Card"}
        </TrelloButton>
      </TrelloForm>
    ) : (
      <TrelloOpenForm list={list} onClick={this.openForm}>
        {list ? "Add another list" : "Add another card"}
      </TrelloOpenForm>
    );
  }
}

export default connect()(TrelloAdd);
