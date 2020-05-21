import React, { Component } from 'react';
import TrelloList from './TrelloList';
import {connect} from 'react-redux';
import TrelloButton from './TrelloButton'
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {sort} from '../actions'
import styled from "styled-components"

const AppContainer = styled.div`
  display: flex;
  flexDirection: row;
`


class App extends Component {

  //reordering of cards
  //reordering logic handeled by reducer
  onDragEnd = (result) => {
    const {destination, source, draggableId, type} = result;

    if(!destination){ //not in a valid droppable location
      return;
    }

    this.props.dispatch(sort(source.droppableId, destination.droppableId,source.index, destination.index, draggableId, type));


  }

  render() {
    const {lists} = this.props;
    return (
      <DragDropContext onDragEnd= {this.onDragEnd} >
        <div className="App">
          <h2> Getting there</h2>
          <Droppable droppableId = "all-lists" direction = "horizontal" type= "list">
            {(provided) => (
              <AppContainer {...provided.droppableProps} ref={provided.innerRef} >
                {lists.map((list,index)=> (
                  <TrelloList listID = {list.id} index = {index} key={list.id} title= {list.title} cards = {list.cards}/>
                ))}
                {provided.placeholder}
                <TrelloButton list />
              </AppContainer>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists

})

export default connect(mapStateToProps)(App);
