import React from 'react';
import classes from './Button.module.css';

const button = (props) => {
    let style;
    switch (props.type) {
        case "allClear":
            style =  {
                gridArea: props.area,
                backgroundColor: "rgb(204, 0, 0)",
                color: "white"
            }
            break;
        case "operation":
            style = {
                gridArea: props.area,
                backgroundColor: "rgb(255, 140, 26)",
                color: "white"
            }
            break;
        case "minus":
            style = {
                gridArea: props.area,
                backgroundColor: "rgb(255, 140, 26)",
                color: "white"
            }
            break;
        case "signChange": 
            style = {
                gridArea: props.area,
                backgroundColor: "rgb(255, 140, 26)",
                color: "white"
            }
            break;
        case "equal": 
            style = {
                gridArea: props.area,
                backgroundColor: "rgb(255, 140, 26)",
                color: "white"
            }
            break;
        default:
            style = {
                gridArea: props.area,
                backgroundColor: "#ddd"
            }
    }
    return (
    <div 
    id={props.id}
    style={style}
    className={classes.Button}
    onClick={props.clicked}>
        {props.children}
    </div>)
}

export default button;