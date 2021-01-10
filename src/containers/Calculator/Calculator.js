import React, { Component } from 'react';
import classes from './Calculator.module.css';
import Button from '../../components/Button/Button';

class Calculator extends Component {
    state = {
        equalJustClicked: false,
        answer: 0,
        currentOperation: 0,
        displayString: "",
        buttons: [
            {value: "AC", area: "AC", type: "allClear", id: "clear"},
            {value: "+/-", area: "sign", type: "signChange", id: "sign"},
            {value: "\u00f7", area: "divide", type: "operation", id: "divide"},
            {value: "7", area: "seven", type: "number", id: "seven"},
            {value: "8", area: "eight", type: "number", id: "eight"},
            {value: "9", area: "nine", type: "number", id: "nine"},
            {value: "\u00d7", area: "multiply", type: "operation", id: "multiply"},
            {value: "4", area: "four", type: "number", id: "four"},
            {value: "5", area: "five", type: "number", id: "five"},
            {value: "6", area: "six", type: "number", id: "six"},
            {value: "\u2212", area: "minus", type: "minus", id: "subtract"},
            {value: "1", area: "one", type: "number", id: "one"},
            {value: "2", area: "two", type: "number", id: "two"},
            {value: "3", area: "three", type: "number", id: "three"},
            {value: "\u002B", area: "plus", type: "operation", id: "add"},
            {value: "0", area: "zero", type: "number", id: "zero"},
            {value: ".", area: "dot", type: "decimal", id: "decimal"},
            {value: "=", area: "equal", type: "equal", id: "equals"}
        ]
    }

    AcClickedHandler = () => {
        this.setState({
            equalJustClicked: false,
            answer: 0,
            currentOperation: 0,
            displayString: ""
        })
    }

    signChangeClickedHandler = () => {
        let expression = this.state.displayString;

        //if two minuses in front of last number, meaning sign change was just presssed previously
        if (/\u{2212}\u{2212}\d$|\u{002B}\u{2212}\d$|\u{00d7}\u{2212}\d$|\u{00f7}\u{2212}\d$/u.test(expression)) {
            let lastDigit = expression[expression.length -1];
            expression = expression.replace(/\u{2212}\d$/u, lastDigit);
        }
        else if (/\u{2212}\u{2212}$|\u{002B}\u{2212}$|\u{00d7}\u{2212}$|\u{00f7}\u{2212}$/u.test(expression)) {
            expression = expression.replace(/\u{2212}$/u, "")
        }
        else if (/\u{002B}$|\u{2212}$|\u{00d7}$|\u{00f7}$/u.test(expression)) {
            expression = expression + "\u2212";
        }
        else if (/\d$/u.test(expression)) {
            let lastDigit = expression[expression.length -1];
            expression = expression.replace(/\d$/u, "\u2212" + lastDigit);
        }
        else {
        }
        this.setState({
            displayString: expression
        })
    }

    numberClickedHandler = (number) => {
        let expression = this.state.displayString;
        expression = expression + number;
        //exception
        if (number === "0" && this.state.displayString === "0") {
            expression = this.state.displayString;
        }
        //if equal just clicked, you should replace whatever is displayed 
        if (this.state.equalJustClicked) {
            this.setState({
                equalJustClicked: false,
                displayString: number,
                currentOperation: number
            })
        } else {
            this.setState({
                displayString: expression,
                currentOperation: number
            })
        }
    }

    operationClickedHandler = (value) => {
        let expression = this.state.displayString;
        if (expression === "") {
            expression = "0";
        }
        const regex = /\u{002B}$|\u{2212}$|\u{00d7}$|\u{00f7}$|\u{002B}\u{2212}$|\u{00d7}\u{2212}$|\u{00f7}\u{2212}$|\u{2212}\u{2212}$/u
        // order: plus minus times divide plus-minus times-minus divide-minus minus-minus
        if (regex.test(expression)) {
            //console.log("last is operation or plus minus or divide minus or times minus!")
            expression = expression.replace(regex, value);
        } else {
            //console.log("last is number!")
            expression = expression + value;
        }
        console.log(expression)
        //if equal just clicked, you should take the previous answer, else as per normal
        if (this.state.equalJustClicked) {
            this.setState({
                equalJustClicked: false,
                displayString: this.state.answer + value,
                currentOperation: value
            })
        } else {
            this.setState({
                currentOperation: value,
                displayString: expression
            }) 
        }
    }

    minusClickedHandler = (value) => {
        let expression = this.state.displayString;
        if (expression === "") {
            expression = "0";
        }
        const regex = /\u{2212}$/u
        if (!regex.test(expression)) {
            expression = expression + value;
        }
        console.log(expression)

        //if equal just clicked, you should take the previous answer, else as per normal
        if (this.state.equalJustClicked) {
            this.setState({
                equalJustClicked: false,
                currentOperation: value,
                displayString: this.state.answer + value
            }) 
        } else {
            this.setState({
                displayString: expression
            })
        }
    }

    equalClickedHandler = (value) => {
        let expression = this.state.displayString;
        let answer;
        // if equal is double clicked, don't evaluate expression. Just do nothing.
        if (this.state.equalJustClicked) {
            return;
        }

        expression = expression.replace(/\u{002B}/ug, "+");
        expression = expression.replace(/\u{2212}/ug, "-");
        expression = expression.replace(/\u{00d7}/ug, "*");
        expression = expression.replace(/\u{00f7}/ug, "/");
        answer = eval(expression)
        console.log(answer);

        this.setState({
            currentOperation: answer,
            displayString: this.state.displayString + value + answer,
            equalJustClicked: true,
            answer: answer
        })
    }

    decimalClickedHandler = (value) => {
        let expression = this.state.displayString;
        if (expression === "" || (!/\d$/.test(expression) && expression[expression.length-1]!==".")) {
            expression = expression + "0";
        }
        //if there is no floating number at end of expression, you may add a float, else you may not
        if (!/\d*\.\d*$/.test(expression)) {
            expression = expression + value
        }
        this.setState({
            displayString: expression
        })
    }

    render () {
        const buttons = this.state.buttons.map (button => {
            let handler;
            switch (button.type) {
                case "allClear":
                    handler = this.AcClickedHandler;
                    break;
                case "signChange":
                    handler = this.signChangeClickedHandler;
                    break;
                case "number":
                    handler = () => this.numberClickedHandler(button.value);
                    break;
                case "operation":
                    handler = () => this.operationClickedHandler(button.value);
                    break;
                case "minus":
                    handler = () => this.minusClickedHandler(button.value);
                    break;
                case "decimal":
                    handler = () => this.decimalClickedHandler(button.value);
                    break;
                case "equal":
                    handler = () => this.equalClickedHandler(button.value);
                    break;
                default:
                    break;
            }
            return (
            <Button 
            key={button.area} 
            area={button.area}
            clicked={handler}
            type={button.type}
            id={button.id}>
                {button.value}
            </Button>)
        })
        return (
            <div className={classes.calculator}>
                <div className={classes.display}>
                    <div className={classes.displayString}>{this.state.displayString}</div>
                    <div id="display" className={classes.currentOperation}>{this.state.currentOperation}</div>
                </div>
                <div className={classes.numberPad}>
                    {buttons}
                </div>
            </div>)
    }
}

export default Calculator;