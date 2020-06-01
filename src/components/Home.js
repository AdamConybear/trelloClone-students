import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addClass } from "../actions";
import ClassObject from "./ClassObject";
import Button from "@material-ui/core/Button";
import Store from "../store";
import { slide as Menu } from 'react-burger-menu';
import "./css/burger.css";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Icon from "@material-ui/core/Icon";
import BurgerClass from "./BurgerClass"

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

const ImportTitle = styled.span`
  font-size: 16px;
  // color: white;
  // font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;
const DateTag = styled.span`
  font-size: 20px;
  color: white;
  position: absolute;
  right: 20px;
  font-family: Arial, Helvetica, sans-serif;
`;

const ClassInput = styled.input`
  width: 200px;
  height: 30px;
  font-size: 16px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 3px;
  border: none;
  outline-color: teal;
  box-shadow: 0 2px 4px black;
  align-self: center;
`;

const FillText = styled.p`
  font-size: 16px;
  // color: white;
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

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline-color: teal;
  border-radius: 3px;
  margin-bottom: 3px;
  padding: 5px;
`;


//shows all classes, import and add classes here
const Home = ({ classes, classOrder, dispatch }) => {

  const d = new Date();
  const [newClassTitle, setNewClassTitle] = useState("");
  const [newDelete, setDelete] = useState("");
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
      <div style={{textAlign: 'center'}}>
        <form onSubmit={handleSubmit}>
          <div>
            <ImportTitle>Import an iCal file</ImportTitle>
            <p style={{fontSize:12}}>upload file button</p>
            <p style={{fontSize:14}}>OR</p>
            <FillText>Fill manually</FillText>
          </div>
          <ClassInput
            onChange={handleChange}
            value={newClassTitle}
            placeholder="Add a class title..."
            type="text"
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
    return classOrder.map(classID => {
      const c = classes[classID];
      if (c.title !== "deleted"){
        return (
          <Link
            key={classID}
            to={`/${c.id}`}
            style={{ textDecoration: "none"}}
          >
            <ClassObject classID = {classID} {...c} />
          </Link>
        );
      }
      // count++;
    });
  };

  return (
    <div>
      {renderBurgerMenu()}
      <HomeContainer>
        <div style={{marginBottom: 30, marginTop: 20}}>
          <AllTitle>All Classes</AllTitle>
          <DateTag>Current Date: {d.getMonth() + 1}/{d.getDate()}</DateTag>
        </div>
        <Thumbnails>{renderClasses()}</Thumbnails>
        {/* {renderCreateClass()} */}
      </HomeContainer>

    </div>
  );
};

const mapStateToProps = state => ({
  classes: state.classes,
  classOrder: state.classOrder
});



export default connect(mapStateToProps)(Home);
