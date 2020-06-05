import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addClass } from "../actions";
import ClassObject from "./ClassObject";
import Button from "@material-ui/core/Button";
import Store from "../store";
import { slide as Menu } from 'react-burger-menu';
import "./css/main.css";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BurgerClass from "./BurgerClass";
import FileUpload from "./FileUpload"
import moment from "moment";

const Thumbnails = styled.div`
  flex: 1;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const AddHeaders = styled.span`
  font-size: 16px;
  // color: white;
  // font-family: Arial, Helvetica, sans-serif;
`;
const DateTag = styled.span`
  font-size: 20px;
  color: white;
  position: absolute;
  right: 20px;
  font-family: Arial, Helvetica, sans-serif;
`;


const AllTitle = styled.span`
  font-size: 40px;
  color: white;
  font-weight: bold;
  margin-top: 50px;

`;

const ClearButton = styled(Button) `
  // position: fixed;
  // text-align: center;
  // margin-top: 100%;
  // bottom: 0;
  width: 175px;
  height: 40px; 
  fontSize: 12px;

`;


//shows all classes, import and add classes here
const Home = ({ classes, classOrder, lists, cards, dispatch }) => {

  const currentDate = moment().format("LL");
  const [newClassTitle, setNewClassTitle] = useState("");
  // const [newDelete, setDelete] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleChange = e => {
    setNewClassTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addClass(newClassTitle));
  };

  const clearState = () => {
    console.log("clearing state");
    const { persistor } = Store();
    persistor.purge();
    window.location.reload(false); //auto refreshes page to rehydrate redux store (not ideal)
  }

  const handleAddVisibility = () => {
    if(showAdd){
      setShowAdd(false);
    }else{
      setShowAdd(true);
    }
  }

  const handleEditVisibility = () => {
    if(showEdit){
      setShowEdit(false);
    }else{
      setShowEdit(true);
    }
  }


  const renderBurgerMenu = () => {
    return (
      <Menu pageWrapId={"page-wrap"} width={ 350 }>
        <div style={{fontSize: 24, fontWeight: 'bold'}}>
          Add Classes 
          <ExpandMoreIcon onClick={handleAddVisibility} style={{fontSize: 30, position: 'absolute', right: 30, cursor: 'pointer'}}/>
          <div>
            {showAdd ? renderCreateClass() : null}
          </div>
        </div>

        <span style={{fontSize: 24, fontWeight: 'bold'}}>
          Edit Classes
          <ExpandMoreIcon onClick={handleEditVisibility} style={{fontSize: 30, position: 'absolute', right: 30, cursor: 'pointer'}}/>
          <div>
            {showEdit ? renderEditClasses() : null}
          </div>
        </span>

        <div style={{bottom: 10, position: 'absolute', left: 87}}>
          <ClearButton onClick= {clearState} variant="contained">Delete All Classes</ClearButton>
        </div>
      </Menu>
      

    );
  };

  const renderCreateClass = () => {
    return (
      <div style={{marginTop: 15}}>
        <form onSubmit={handleSubmit}>
          <div>
            <AddHeaders>-- Auto Fill</AddHeaders>
            <FileUpload />
            <p style={{fontSize:14, marginLeft: 3, opacity: 0.8, color: 'white'}}>*upload an ical file (.ics)</p>
            {/* <p style={{fontSize:12}}>import button</p> */}
            <AddHeaders>-- Manually Fill</AddHeaders>
          </div>
          <input
            onChange={handleChange}
            value={newClassTitle}
            placeholder="Add a class title..."
            type="text"
            maxLength="60"
            className="addClassInput"
            />
        </form>
      </div>
    );
  };

  const renderEditClasses = () => {
    return classOrder.map(classID => {
      const c = classes[classID];
      if (c.title !== "deleted"){
        return (
          <BurgerClass key={classID} classID={classID} title={c.title}/>
        );
      }
    });
  };
  
  const renderClasses = () => {
    return classOrder.map((classID) => {
      const c = classes[classID];
      let nearestDate;
      //getting next due date for each class
      if(c.title !== "deleted"){
        const listOrder = c.lists;
        let count = 0; // allows me to set first date as the nearest date
        listOrder.map(listID=>{
          const l = lists[listID];
          if (l){
            const listCards = l.cards.map(cardID => cards[cardID]);
            listCards.map(card => {
              // console.log("date: " + card.date);
              if (count === 0){ //initialize nearest Date to the first card,
                nearestDate = card.date;
                count++;
              }else{
                if (card.date < nearestDate){
                  nearestDate = card.date;
                }
              }
            });
          }
        });
        // console.log("next date in the entire class is: " + nearestDate);
      }
      
      if (c.title !== "deleted"){
        return (
          <Link
            key={classID}
            to={`/${c.id}`}
            style={{ textDecoration: "none"}}
          >
            <ClassObject minDate={nearestDate} classID = {classID} {...c} />
          </Link>
        );
      }
    });
  };

  return (
    <div>
      {renderBurgerMenu()}
      <HomeContainer>
        <div style={{marginBottom: 30, marginTop: 20}}>
          <AllTitle>All Classes</AllTitle>
          <DateTag>{currentDate}</DateTag>
        </div>
        <Thumbnails>{renderClasses()}</Thumbnails>
      </HomeContainer>

    </div>
  );
};

const mapStateToProps = state => ({
  classes: state.classes,
  classOrder: state.classOrder,
  lists: state.lists,
  cards: state.cards,
});



export default connect(mapStateToProps)(Home);
