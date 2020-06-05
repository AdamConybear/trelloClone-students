import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import moment from "moment";

const Outline = styled.div`
  height: 300px;
  width: 300px;
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

const ClassContent = styled.div `
  text-align: center;
`;

const Title = styled.h4`
  color: black;
  font-size: 24px;
  align-self: center;
`;

const Due = styled.div`
  color: black;
  font-size: 14px;
  text-decoration: none;
  position: absolute;
  bottom: 10px;
  left: 10px;
`;


const ClassObject = ({ title, minDate }) => {
  
  let nextDate;
  if(minDate){
    nextDate = moment(minDate).format("MMM Do");
  }else{
    nextDate = "No date available";
  }
  console.log("class: '" + title + "' has date: " + nextDate);

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
