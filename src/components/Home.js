import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addClass } from "../actions";
import ClassObject from "./ClassObject";

const Thumbnails = styled.div`
  flex: 1;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const CreateTitle = styled.span`
  font-size: 32px;
  // margin-top: 10px;
  // margin-bottom: 50px;
  color: white;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;
const DateTag = styled.span`
  font-size: 24px;
  color: white;
  // font-weight: bold;
  position: absolute;
  // margin-top: 10px;
  right: 10px;
  font-family: Arial, Helvetica, sans-serif;
`;

const CreateInput = styled.input`
  width: 400px;
  height: 80px;
  font-size: 22px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 3px;
  border: none;
  outline-color: blue;
  box-shadow: 0 2px 4px black;
  align-self: center;
`;
//shows all classes, import and add classes here
const Home = ({ classes, classOrder, dispatch }) => {

  let d = new Date();

  const [newClassTitle, setNewClassTitle] = useState("");

  const handleChange = e => {
    setNewClassTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addClass(newClassTitle));
  };

  const renderClasses = () => {
    return classOrder.map(classID => {
      const c = classes[classID];

      return (
        <Link
          key={classID}
          to={`/${c.id}`}
          style={{ textDecoration: "none" }}
        >
          <ClassObject classID = {classID} {...c} />
        </Link>
      );
    });
  };

  const renderCreateClass = () => {
    return (
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        {/* <CreateTitle>Create a new Class</CreateTitle> */}
        <div style={{marginBottom: 20, marginTop: 20}}>
          <CreateTitle>Create a new Class</CreateTitle>
          <DateTag>Current Date: {d.getMonth()}/{d.getDate()}</DateTag>
        </div>
        
        <CreateInput
          onChange={handleChange}
          value={newClassTitle}
          placeholder="Your classes title..."
          type="text"
        />
      </form>
    );
  };

  return (
    <HomeContainer>
      {renderCreateClass()}
      <Thumbnails>{renderClasses()}</Thumbnails>
    </HomeContainer>
  );
};

const mapStateToProps = state => ({
  classes: state.classes,
  classOrder: state.classOrder
});

export default connect(mapStateToProps)(Home);
