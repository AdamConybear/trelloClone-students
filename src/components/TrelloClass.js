import React, { PureComponent } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloAdd from "./TrelloAdd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { sort, setActiveClass } from "../actions";
import { Link } from "react-router-dom";
import moment from "moment";
import Icon from "@material-ui/core/Icon";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const HomeIcon = styled(Icon)`
  position: absolute;
  left: 20px;
  cursor: pointer;
  color: black;

  &:hover {
    opacity: 0.6;
  }
`;
const currentDate = moment().format("LL");

class TrelloClass extends PureComponent {

  componentDidMount() {
    // set active trello class here
    const { classID } = this.props.match.params;

    this.props.dispatch(setActiveClass(classID));
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { lists, cards, match, classes } = this.props;
    const { classID } = match.params;
    const c = classes[classID];
    if (!c) {
      return <p>c not found</p>;
    }
    const listOrder = c.lists;

    return (
      <div style={{marginLeft: 15}}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {/* <Link to="/">Back to Classes</Link> */}
          <div style={{padding: 20, fontSize: 20}}>
            <Link to="/" style={{ textDecoration: "none"}}>
              <HomeIcon fontSize='large'>home</HomeIcon>
            </Link>
            <span style={{fontWeight: 'bold', fontSize: 26, marginLeft: 35}}>{c.title}</span>
            <span style={{position: 'absolute', right: 20, top: 20}}>{currentDate}</span>

          </div>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {provided => (
              <ListsContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {listOrder.map((listID, index) => {
                  const list = lists[listID];
                  if (list) {
                    const listCards = list.cards.map(cardID => cards[cardID]);

                    return (
                      <TrelloList
                        listID={list.id}
                        key={list.id}
                        title={list.title}
                        cards={listCards}
                        index={index}
                      />
                    );
                  }
                })}
                {provided.placeholder}
                <TrelloAdd list />
              </ListsContainer>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  classes: state.classes
});

export default connect(mapStateToProps)(TrelloClass);
