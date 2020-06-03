import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { editCardDate } from "../actions";
import "./css/main.css";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

// const DateButton = styled(Icon)`
//   position: relative;
//   display: inline;
//   opacity: 0.5;
//   cursor:pointer
//   &:hover {
//     opacity: 0.8;
//   }
//   float: left;
//   margin-right: 7px
// `;

const TrelloDatePicker = ({ date, listID, id, dispatch }) => {
    const [cardDate, setDate] = useState(moment(date).toDate());
    const [datePickerOpen, setDatePickerOpen] = useState(false);

    const handleChange = (newDate) => {
        setDate(newDate);
        // console.log(date);
        // console.log("new date: " + cardDate);
        
        dispatch(editCardDate(id,listID,newDate));
    }


    // const toggleDatePicker = () => {
    //     if(datePickerOpen){
    //         setDatePickerOpen(false);
    //         console.log("picker closed on card id of " + id);
    //     }else{
    //         setDatePickerOpen(true);
    //         console.log("picker open on card id of " + id);
    //     }
    // };


    return (
        <div style={{position: 'absolute', bottom: 5, left: 13, fontSize: 12}}>
            <DatePicker
              selected={cardDate}
              onChange={date => handleChange(date)}
              customStyles={{dateInput:{outline:'none'}}}
              dateFormat="MMM d"
            />
        </div>
    );
};

export default connect()(TrelloDatePicker);