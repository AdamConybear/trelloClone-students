import React from "react";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import { deleteClass } from "../actions";
import { connect } from "react-redux";

const Thumbnail = styled.div`
  height: 275px;
  width: 275px;
  background: #f0ead6;
  padding: 10px;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 0 2px 4px black;
  position: relative;
`;

const Title = styled.h4`
  color: black;
  font-size: 24px;
  text-decoration: none;
`;

const Due = styled.div`
  color: black;
  font-size: 14px;
  text-decoration: none;
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

const DeleteButton = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  opacity: 0.4;
  position: absolute;
  right: 10px;
  top: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

const ClassObject = ({ title , classID, dispatch }) => {
  // console.log(title);

  const handleDeleteClass = () => {
    console.log(classID);
    dispatch(deleteClass(classID));
  };


  return (
    <Thumbnail>
      {/* <DeleteButton onClick={handleDeleteClass} >delete</DeleteButton> */}
      <Title>{title}</Title>
      <Due>
        Next due date: x
      </Due>

    </Thumbnail>
  );
};

export default connect()(ClassObject);
