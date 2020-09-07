import React from 'react';
import { connect } from "react-redux";
import "./css/main.css";
import ICAL from "ical.js";
import { addCard, addClass, addListByID } from "../actions";
import moment from "moment";
import Button from "@material-ui/core/Button";



let classMap = new Map();

const FileUpload = ({classes, classOrder, lists, cards, dispatch}) => {

    let fileReader;
    // let classMap = new Map();
    // let uploaded = false;
    // const[fileUploaded, setFileUploaded] = useState(false);

    const parseEvent = (e) => {
        //passed in a single vevent
        //event being returned needs to have the summary's title, dtend's date
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
        //parse the content with ical.js

        let fileData = ICAL.parse(content);
        let events = fileData[2]; // the 2 index contains all the vevents
        let result = []; //will contain all the event objects that I will then need to sort

        let brackets = [];
        // let classMap = new Map();

        events.forEach(e => result.push(parseEvent(e))); 
        // console.log(result);
        const len = Object.keys(result).length;

        //creates a map with key = class name and value = array of all assignments in class
        for(let i = 0; i < len; i++){
            let summary = result[i].summary;
            let dateEnd = result[i].dtend;
            let sumLen;
            let className = "";

            for(let j = 0; j < summary.length-1; j++){ //star
                if(brackets.includes("[")){
                    className += summary.charAt(j);
                }
                if(summary.charAt(j) === "["){
                    brackets.push("[");
                    sumLen = j-1;
                }
            }
            brackets.pop();
            let parsedSum = summary.substr(0,sumLen); //removes the className
            let assignmentArr = [parsedSum, dateEnd];

            if (!classMap.has(className)){
                classMap.set(className, [assignmentArr]);
                // numClasses++;
            }else{
                let arr = classMap.get(className) ;
                arr.push(assignmentArr);
                classMap.set(className, arr);
            }
        }
        console.log(classMap);
        
        
        //add classes
        for(const [key, value] of classMap.entries()){
            dispatch(addClass(key));
        }

        // //create lists, or every new class has set lists
        

    }

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    }


    async function addLists(){
        if(classMap.size !== 0){ //class map was filled
            console.log("adding lists");
            // console.log(classOrder);

            classOrder.map(classID => {
                const c = classes[classID];
                for(const [key, value] of classMap.entries()){
                    if (c.title === key){
                        dispatch(addListByID(classID, "Assignments"));
                        dispatch(addListByID(classID, "Quizzes"));
                        dispatch(addListByID(classID, "Exams"));
                    }
                }
                // dispatch(addListByID(classID, "Other"));
            });

        }else{ // class not yet filled
            console.log("class map not defined")
        }
        // // uploaded = false;
    }

    const addCards = () => {

        if(classMap.size !== 0) {
            console.log("adding cards");
            // let value_count = 0;
            classOrder.map(classID => {
                const c = classes[classID]
                const listOrder = c.lists;
                // const listID = listOrder[i];
                console.log("class: " + c.title + " has lists: " + listOrder);
                // console.log(listOrder[0]); //gives me the list id
                listOrder.map(listID => {
                    const l = lists[listID];
                    // const list_title = l.title;
                    // console.log(listl);
                    
                    for(const [key, value] of classMap.entries()){
                        // console.log(value);
                        if(key === c.title){
                            for (let i = 0; i < value.length; i++){
                                let text = value[i][0];
                                let date = moment(value[i][1]).format();
                                if (l.title === "Exams"){
                                    if (text.includes("Exam") || text.includes("exam")){
                                        console.log("belongs in exam list");
                                        dispatch(addCard(listID,text,date));
                                    }
                                }else if(l.title === "Quizzes"){
                                    if(text.includes("Quiz") || text.includes("quiz")){
                                        console.log("belongs in quiz list");
                                        dispatch(addCard(listID,text,date));
                                    }
                                }else if (l.title === "Assignments"){
                                    if(text.includes("Exam") || text.includes("Quiz") || text.includes("quiz") || text.includes("exam")){
                                    }else{                        
                                        console.log("belongs in assignment list");           
                                        dispatch(addCard(listID,text,date));      
                                    }
                                }
                            }
                        }
                    }
                });
            });

        }else{
            console.log("nothing in class map");
        }
    }

    // const addComponents = () => {
    //     // console.log("this is the map:");
    //     // for(const [key, value] of map.entries()){
    //     //     dispatch(addClass(key));
    //     // }

    //     // console.log(classOrder);
    // }

    // function addAll() {
    //     console.log("add all");
    //     // addLists();
    //     if (addLists()){
    //         addCards();
    //     }
    //     // if (addLists()){
    //     //     addCards();
    //     // }
    //     // addCards();
    // }



    return(
        <div>
            <div className='upload-expense' style={{marginLeft: 50}}>
                <input
                    type='file'
                    id = 'file'
                    className = 'input-file'
                    accept='.ics'
                    onChange={e => handleFileChosen(e.target.files[0])}
                />
                
                {/* <span>{ ? addFile(): null}</span> */}
            </div>
            <div style={{fontSize:12, opacity: 0.9, color: '#d1d1d1', paddingTop: 3,paddingBottom: 10, textAlign:'center', color: '#907163'}}>*upload an ical file (.ics)</div>
            <div style={{paddingBottom:15, textAlign:'center'}}>
                <Button size="small" variant="contained" style={{fontSize: 11, marginRight: 10, cursor: 'pointer'}} onClick={addLists}>
                    Import Lists
                </Button>
                <Button size="small" variant="contained" style={{fontSize: 11,  marginRight: 10, cursor: 'pointer'}} onClick={addCards}>
                    Import Cards
                </Button>
            </div>
            {/* <a style={{fontSize: 14, cursor: 'pointer'}} onClick={addAll}>
                Import All
            </a> */}
        </div>
        
    );
};

const mapStateToProps = state => ({
    classes: state.classes,
    classOrder: state.classOrder,
    lists: state.lists,
    cards: state.cards,
  });

export default connect(mapStateToProps)(FileUpload);
