import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import TrelloForm from "./TrelloForm";
import { editCardTitle, deleteCard } from "../actions";
import { connect } from "react-redux";
import TrelloButton from "./TrelloButton";
import TrelloDatePicker from "./TrelloDatePicker";





const CardContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
`;

const EditButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  top: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const DateButton = styled(Icon)`
  position: absolute;
  display: inline;
  left: 5px;
  bottom:5px;
  opacity: 0.5;
  cursor:pointer
  &:hover {
    opacity: 0.8;
  }
  float: left;
  margin-right: 10px;
  margin-left: 10px;
`;

const DateText = styled.div `
  display: inline;
  position: absolute;
  left: 35px;
  bottom: 3px;
  font-size: 14px;
  color: #909090;

`;

// const EditingCard = styled(Icon)`
//   position: absolute;
//   display: none;
//   right: 5px;
//   top: 5px;
//   opacity: 0.5;
//   ${CardContainer}:hover & {
//     display: block;
//     cursor: pointer;
//   }
//   &:hover {
//     opacity: 0.8;
//   }
// `;

const DeleteButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  bottom: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const TrelloCard = React.memo(({ text, date, id, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setText] = useState(text);
  const [cardDate, setDate] = useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const closeForm = e => {
    setIsEditing(false);
  };

  const handleTextChange = e => {
    setText(e.target.value);
  };
  // const handleDateChange = e => {
  //   e.preventDefault();

  //   setDate(e.target.value);
  //   dispatch(editCardDate(id,listID,cardDate));
    
  // };

  const saveCard = e => {
    e.preventDefault();

    dispatch(editCardTitle(id, listID, cardText));
    setIsEditing(false);
  };

  const handleDeleteCard = e => {
    console.log(listID);
    dispatch(deleteCard(id, listID));
  };

  // const toggleDatePicker = () => {
  //   console.log("toggling date");
  //   if(datePickerOpen){
  //     setDatePickerOpen(false);
  //   }else{
  //     setDatePickerOpen(true);
  //   }
  // }

  // const CustomDateIcon = React.forwardRef((props,ref) => {

  //   return (
  //      <button onClick={props.onClick} ref={ref}>
  //        {props.value || props.placeholder}
  //      </button>
  //   )

  // })


  const renderEditForm = () => {
    return (
      <TrelloForm list={false} text={cardText} onTextChange={handleTextChange} closeForm={closeForm}>
        <TrelloButton onClick={saveCard}>Save</TrelloButton>
      </TrelloForm>
    );
  };

  const renderCard = () => {
    return (
      <Draggable draggableId={String(id)} index={index}>
        {provided => (
          <CardContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onDoubleClick={() => setIsEditing(true)}
          >
            <Card>
              
              <EditButton
                onMouseDown={() => setIsEditing(true)}
                fontSize="small"
              >
                edit
              </EditButton>
              {/* <DateButton fontSize="small">calendar_today</DateButton> */}
              <DeleteButton fontSize="small" onMouseDown={handleDeleteCard}>
                delete
              </DeleteButton>
              {/* <DateButton fontSize="small" >
                calendar_today
              </DateButton> */}

              <CardContent>
                <Typography style={{marginBottom:12}}>{text}</Typography>
                {/* <Typography style={{marginTop: 10, fontSize: 14}}>{date}</Typography> */}
                {/* <div style={{marginTop: 10, fontSize: 16}}>
                  <DateButton fontSize='inherit'>calendar_today</DateButton>
                  <DateText>
                    {date} 
                  </DateText>
                </div> */}
                <TrelloDatePicker date={date} id={id} listID={listID}/>
              
              </CardContent>
              {/* <div>
                Due Date
              </div> */}
            </Card>
          </CardContainer>
        )}
      </Draggable>
    );
  };

  return isEditing ? renderEditForm() : renderCard();
});


export default connect()(TrelloCard);


{/* <div style={{marginTop: 10, fontSize: 14, display: 'inline'}}>
<TrelloDatePicker date={date} listID={listID} id={id}/>
{/* <div style={{display:'inline', position: 'absolute', left: 30,}}>
  {date}
</div> */}
//</div> */}