import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { editCardDate } from "../actions";
import "./css/main.css";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";


const TrelloDatePicker = ({ date, listID, id, dispatch }) => {
    const [cardDate, setDate] = useState(moment(date).toDate());
    // const [datePickerOpen, setDatePickerOpen] = useState(false);

    const handleChange = (newDate) => {
        setDate(newDate);
        // console.log(date);
        // console.log("new date: " + newDate);
        
        dispatch(editCardDate(id,listID,newDate));
    }

    return (
        <div style={{position: 'absolute', bottom: 5, left: 13, fontSize: 12}}>
            <DatePicker
              selected={cardDate}
              onChange={date => handleChange(date)}
              customStyles={{dateInput:{outline:'none'}}}
              dateFormat="MMM d"
              className="date-picker"
            />
        </div>
    );
};

export default connect()(TrelloDatePicker);