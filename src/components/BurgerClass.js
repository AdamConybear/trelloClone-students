import React, {useState} from 'react';
import styled from "styled-components";
import { editClassTitle } from "../actions";
import Icon from "@material-ui/core/Icon";
import { connect } from "react-redux";
import "./css/main.css";


const DeleteButton = styled(Icon)`
  position: absolute;
  right: 35px;
  opacity: 0.5;
  margin-top: 3px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  
`;

const TitleClass = styled.div`
    max-width: 220px;
    font-size: 16px;
    float: left;
    margin-top: 5px;
`;


const BurgerClass = ({ title, classID, dispatch }) => { 

    const [isEditing, setIsEditing] = useState(false);
    const [classTitle, setClassTitle] = useState(title);

    const handleDeleteClass = () => {
        console.log("class being deleted has id: " + classID);
        dispatch(editClassTitle(classID, "deleted")); //fake deletes it
    };


    const renderEditInput = () => {
        return (
          <form onSubmit={handleFinishEditing}>
            <input
              type="text"
              value={classTitle}
              onChange={handleClassChange}
              autoFocus
              onFocus={handleFocus}
              onBlur={handleFinishEditing}
              className="burger-edit"
            />
          </form>
        );
      };
    
      const handleFocus = e => {
        e.target.select();
      };
    
      const handleClassChange = e => {
        e.preventDefault();
        setClassTitle(e.target.value);
      };
    
      const handleFinishEditing = e => {
        setIsEditing(false);
        dispatch(editClassTitle(classID, classTitle));
      };

    return (
        <div>
            { isEditing ? (renderEditInput()) : 
            (
            <ul>
                <li>
                    <TitleClass onClick={() => setIsEditing(true)}>
                        {classTitle}
                    </TitleClass>
                    <DeleteButton style={{fontSize: 20, float: 'right'}} onClick={handleDeleteClass}>
                        delete
                    </DeleteButton>                    
                </li>
            </ul>
            )}
        </div>
    );
};


export default connect()(BurgerClass);