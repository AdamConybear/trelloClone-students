import React from 'react';
import { connect } from "react-redux";
import "./css/main.css";
import ICAL from "ical.js";

const FileUpload = () => {

    let fileReader;

    const parseEvent = (e) => {
        //passed in a single vevent
        //event being returned needs to have the summary's title, dtend's date
        //from summary's title I will get the class name

        //iterate through all the events

        //for each vevent in event
        //vevent[1] contains all the properties

        //vevent[1][2] contains dtend array
        //vevent[1][2][3] contains dtend date

        //veevent[1][7] contains summary array
        //vevent[1][7][3] contains summary title

        let event = {};

        for (let i= 0; i < e[1].length; i++){
            let prop = e[1][i];
            if (prop[0] === "dtend"){
                event[prop[0]] = prop[3];
            }
            if(prop[0] === "summary"){
                event[prop[0]] = prop[3];
            }
        }

        return event;
    }

    const handleFileRead = e => {
        const content = fileReader.result;
        console.log("ENTIRE TEXT FILE");
        console.log(content);
        //parse the content with ical.js
        // const len = content.length;
        // alert(typeof content);
        let fileData = ICAL.parse(content);
        console.log("PARSED DATA");
        console.log(fileData);
        let events = fileData[2]; // the 2 index contains all the vevents
        let result = []; //will contain all the event objects that I will then need to sort

        events.forEach(e => result.push(parseEvent(e))); 

        console.log(result);



        // let comp = new ICAL.Component(fileData);
        // let vevent = comp.getFirstSubcomponent("vevent");
        // console.log("VEVENT");
        // console.log(vevent);
        // let summary = vevent.getFirstPropertyValue("summary");
        // console.log("SUMMARY");
        // console.log(summary);
        
    }

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    }


    return(
        <div className='upload-expense'>
            <input
                type='file'
                id = 'file'
                className = 'input-file'
                accept='.ics'
                onChange={e => handleFileChosen(e.target.files[0])}
            
            />
        </div>
    );
};

export default connect()(FileUpload);
