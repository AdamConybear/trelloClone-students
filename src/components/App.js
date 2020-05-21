import React, { Component } from 'react';
import TrelloList from './TrelloList';
import {connect} from 'react-redux';
// import TrelloCard from './TrelloCard';


class App extends Component {
  render() {
    const {lists} = this.props;
    return (
      <div className="App">
        <h2> Getting there</h2>
        <div style={styles.listContainer}>
          {lists.map(list=> (
            <TrelloList key={list.id} title= {list.title} cards = {list.cards}/>
          ))}

        </div>
      </div>
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
