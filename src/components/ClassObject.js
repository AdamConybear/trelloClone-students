import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import moment from "moment";
// import { addListByID} from "../actions";

const Outline = styled.div`
  height: 300px;
  width: 300px;
  // background: #e7a083; 
  background: #D59A69
  padding: 10px;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50px;
  box-shadow: 0 2px 4px black;
  position: relative;
  transition: transform .2s; /* Animation */
  &:hover{
    transform: scale(1.05)
  }

`;

const ClassContent = styled.div `
  text-align: center;
`;

const Title = styled.h4`
  color: #EAE7DC;
  font-size: 24px;
  align-self: center;
`;

const Due = styled.div`
  color: #EAE7DC;
  font-size: 14px;
  text-decoration: none;
  position: absolute;
  bottom: 25px;
  left: 25px;
  // text-align:center;
`;


const ClassObject = ({ title, minDate, dispatch, classID }) => {
  
  let nextDate;
  if(minDate){
    nextDate = moment(minDate).format("MMM Do");
  }else{
    nextDate = "N/A";
  }
  console.log("class: '" + title + "' has date: " + nextDate);
  
  // dispatch(addListByID(classID, "Assignments"));

  return (
    <Outline>
      <ClassContent>
        <Title>{title}</Title>
        <Due>
          Next due date: {nextDate}
        </Due>
      </ClassContent>
    </Outline>
  );
};

export default connect()(ClassObject);
