import React from "react";
import styled from "styled-components";
// import Icon from "@material-ui/core/Icon";
// import { deleteClass, editClassTitle } from "../actions";
import { connect } from "react-redux";

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
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // width: 100%
`;

const Title = styled.h4`
  color: black;
  font-size: 24px;
  align-self: center
  // word-wrap: break-word;
`;

const Due = styled.div`
  color: black;
  font-size: 14px;
  text-decoration: none;
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

// const DeleteButton = styled(Icon)`
//   cursor: pointer;
//   transition: opacity 0.3s ease-in-out;
//   opacity: 0.4;
//   position: absolute;
//   right: 10px;
//   top: 10px;
//   &:hover {
//     opacity: 0.8;
//   }
// `;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline-color: blue;
  border-radius: 3px;
  margin-bottom: 3px;
  padding: 5px;
`;

const ClassObject = ({ title }) => {
  // const [isEditing, setIsEditing] = useState(false);
  // const [classTitle, setClassTitle] = useState(title);

  // const renderEditInput = () => {
  //   console.log("editing title")
  //   return (
  //     <form onSubmit={handleFinishEditing}>
  //       <StyledInput
  //         type="text"
  //         value={classTitle}
  //         onChange={handleChange}
  //         autoFocus
  //         onFocus={handleFocus}
  //         onBlur={handleFinishEditing}
  //       />
  //     </form>
  //   );
  // };

  // const handleFocus = e => {
  //   e.target.select();
  // };

  // const handleChange = e => {
  //   e.preventDefault();
  //   setClassTitle(e.target.value);
  // };

  // const handleFinishEditing = () => {
  //   setIsEditing(false);
  //   dispatch(editClassTitle(classID, classTitle));
  // };

  // const handleDeleteClass = () => {
  //   console.log("class being deleted has id:" + classID);
  //   dispatch(deleteClass(classID));
  // };


  return (
    <Outline>
      <ClassContent>
        <Title>{title}</Title>
        <Due>
          Next due date: x
        </Due>
      </ClassContent>
    </Outline>
  );
};

export default connect()(ClassObject);


{/* <div>
  {isEditing ? (renderEditInput()) : (
    <div onClick={() => setIsEditing(true)}>
      <Title style={{flexWrap: "wrap", flexDirection: "column"}}>{title}</Title>
      {/* <DeleteButton onClick={handleDeleteClass} >delete</DeleteButton> */}
    //</div>
  
  //)}
//</div> */}