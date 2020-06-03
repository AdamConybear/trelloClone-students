import React from "react";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Textarea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";

const Container = styled.div`
  min-width: 284px;
  margin-bottom: 8px;
`;

const StyledCard = styled(Card)`
  min-height: 85px;
  padding: 6px 8px 2px;
`;

const BigCard = styled.div`

  // padding: 6px 8px 2px;
`;

const StyledTextArea = styled(Textarea)`
  resize: none;
  width: 100%;
  overflow: hidden;
  outline: none;
  border: none;
`;

const ButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const StyledIcon = styled(Icon)`
  margin-left: 8px;
  cursor: pointer;
`;

const TrelloForm = React.memo(
  ({ list, text = "", onTextChange, closeForm, children }) => {
    // const placeholder = list
    //   ? "Enter list title..."
    //   : "Enter a title for this card...";
    // const isList = list ? true : false;


    const renderFormList =() => {
      console.log("opening list")
      return (
        <Container>
          <StyledCard>
            <StyledTextArea
              placeholder="Enter list title..."
              autoFocus
              value={text}
              onChange={e => onTextChange(e)}
              onBlur={closeForm}
            />
          </StyledCard>
          <ButtonContainer>
            {children}
            <StyledIcon onMouseDown={closeForm}>close</StyledIcon>
          </ButtonContainer>
        </Container>
      );



    };

    const renderFormCard = () => {
      console.log("opening card");
      return (
        <Container>
          <StyledCard>
            <StyledTextArea
              placeholder="Enter a title for this card..."
              autoFocus
              value={text}
              onChange={e => onTextChange(e)}
              onBlur={closeForm}
            />
          </StyledCard>
          <ButtonContainer>
            {children}
            <StyledIcon onMouseDown={closeForm}>close</StyledIcon>
          </ButtonContainer>
        </Container>
      );
    };


    return list ? renderFormList() : renderFormCard();

    // return list ? (
    //   <Container>
    //     <StyledCard>
    //       <StyledTextArea
    //         placeholder={placeholder}
    //         autoFocus
    //         value={text}
    //         onChange={e => onTextChange(e)}
    //         onBlur={closeForm}
    //       />
    //     </StyledCard>
    //     <ButtonContainer>
    //       {children}
    //       <StyledIcon onMouseDown={closeForm}>close</StyledIcon>
    //     </ButtonContainer>
    //   </Container>
    // ) : (
    //   <Container>
    //     <StyledCard>
    //       <StyledTextArea
    //         placeholder={placeholder}
    //         autoFocus
    //         value={text}
    //         onChange={e => onTextChange(e)}
    //         onBlur={closeForm}
    //       />
    //       <StyledDateArea
    //         placeholder="Enter Due Date..."
    //         autoFocus
    //         value={date}
    //         onChange={e => onDateChange(e)}
    //         onBlur={closeForm}
    //       />
    //     </StyledCard>
    //     <ButtonContainer>
    //       {children}
    //       <StyledIcon onMouseDown={closeForm}>close</StyledIcon>
    //     </ButtonContainer>
    //   </Container>
    // );
  }
);

export default TrelloForm;
