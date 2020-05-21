import React, { Component } from 'react';
import TrelloList from './TrelloList';
import {connect} from 'react-redux';
import TrelloButton from './TrelloButton'
import {DragDropContext} from "react-beautiful-dnd";


class App extends Component {

  onDragEnd = () => {

  }

  render() {
    const {lists} = this.props;
    return (
      <DragDropContext onDragEnd= {this.onDragEnd} >
        <div className="App">
          <h2> Getting there</h2>
          <div style={styles.listContainer}>
            {lists.map(list=> (
              <TrelloList listID = {list.id} key={list.id} title= {list.title} cards = {list.cards}/>
            ))}
            <TrelloButton list />
          </div>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists

})

const styles = {
  listContainer:{
    display: 'flex',
    flexDirection: 'row',
    // marginRight: 8,
  }
};

export default connect(mapStateToProps)(App);
