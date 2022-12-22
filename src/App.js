import logo from './logo.svg';
import './App.css';
import React from "react";
const MARGIN_BUTTONS=22;
const CURRENT_BUTTON=0;
const ONE_NEXT_LINE_CELL=1;
const TOW_NEXT_LINE_CELL=2;
const TREE_NEXT_LINE_CELL=3;
const START_LINE_CELL=0;
const END_LINE=5;
const END_CELL=7;



class App extends React.Component {
 state = {
      values : [
         [null,null,null,null,null,null,null],
             [null,null,null,null,null,null,null],
             [null,null,null,null,null,null,null],
             [null,null,null,null,null,null,null],
             [null,null,null,null,null,null,null],
             [null,null,null,null,null,null,null],
     ],
     columnsButtons: ['','','','','','',''],
     player:false,
     playerColor:"red",
     currentButton:CURRENT_BUTTON
 }
    changPlayer = () => {  //  החלפת שחקן+צבע
     if (this.state.player===(false)){
         this.setState({player:true});
         this.setState({playerColor:"green"});
     }
     else {
         this.setState({player:false});
         this.setState({playerColor:"red"});
     }
 }

 checkWin = (line,index) => {  //  בדיקת ניצחון
     let ans=false;
         let temp = this.state.values [line][index];
         if (temp !== null) {
             try {
                 if ((temp === this.state.values [line][index + ONE_NEXT_LINE_CELL] && // מקרה של 4 בשורה
                         temp === this.state.values [line][index + TOW_NEXT_LINE_CELL] &&
                         temp === this.state.values [line][index + TREE_NEXT_LINE_CELL]) ||
                     (temp === this.state.values [line][index - ONE_NEXT_LINE_CELL] &&
                         temp === this.state.values [line][index - TOW_NEXT_LINE_CELL] &&
                         temp === this.state.values [line][index - TREE_NEXT_LINE_CELL])) {
                     ans = true;
                 } else if (temp === this.state.values [line + ONE_NEXT_LINE_CELL][index] && // מקרה של 4 בטור
                     temp === this.state.values [line + TOW_NEXT_LINE_CELL][index] &&
                     temp === this.state.values [line + TREE_NEXT_LINE_CELL][index]) {
                     ans = true;
                 } else if ((temp === this.state.values [line + ONE_NEXT_LINE_CELL][index + ONE_NEXT_LINE_CELL] && // מקרה של 4 באלכסון
                         temp === this.state.values [line + TOW_NEXT_LINE_CELL][index + TOW_NEXT_LINE_CELL] &&
                         temp === this.state.values [line + TREE_NEXT_LINE_CELL][index + TREE_NEXT_LINE_CELL]) ||
                     (temp === this.state.values [line + ONE_NEXT_LINE_CELL][index - ONE_NEXT_LINE_CELL] && // מקרה של 4 באלכסון
                         temp === this.state.values [line + TOW_NEXT_LINE_CELL][index - TOW_NEXT_LINE_CELL] &&
                         temp === this.state.values [line + TREE_NEXT_LINE_CELL][index - TREE_NEXT_LINE_CELL])) {
                     ans = true;
                 }
             } catch (err) {
             }
     }
     return ans;
 }


    changeBackground = (index) => {  //  שינוי צבע רקע
        if (this.state.values[ONE_NEXT_LINE_CELL][index] !== null) {
            alert("this column is full!")
        } else {
            for (let i=END_LINE;i>=START_LINE_CELL;i--) {
                if (this.state.values[i][index] === null) {
                    debugger
                    let currentValues = this.state.values;
                    currentValues[i][index] = this.state.player;
                    this.setState({
                        values: currentValues
                    })
                    if (this.checkWin(i,index)){
                        alert("congratulation to the " + this.state.playerColor + " player.  you win!!");
                            this.clearTable();
                            alert("now is the "+ (this.state.playerColor==="red"? "green":"red") + " player turn, to start!");
                    }
                    break;
                }
            }

        }
    }

    clearTable= () => {
     for (let i=START_LINE_CELL;i<END_LINE+ONE_NEXT_LINE_CELL;i++){
         for (let j=START_LINE_CELL;j<END_CELL;j++){
             if (this.state.values[i][j] !== null){
                 let currentValues = this.state.values;
                 currentValues[i][j] = null;
                 this.setState({
                     values: currentValues
                 })
             }
         }
     }
    }

    render() {

    return (
        <div className="App">
            <div>
                <h1>
                    Welcome to four in line
                </h1>
            </div>
            {this.state.columnsButtons.map((creatButton,buttonNumber) => {
                return(
                    <button style={{margin: MARGIN_BUTTONS}}  onClick={() =>{this.changeBackground(buttonNumber);this.setState({creatButton:buttonNumber});this.changPlayer()}}>V </button>
                )
            })}
            <table>
                    {
                        this.state.values.map((row,rowIndex) => {
                            return(
                                <tr>
                                    {
                                        row.map((cell,cellIndex) => {
                                            return (

                                                <td style={{backgroundColor:
                                                        (this.state.values[rowIndex][cellIndex]===false)? "red" :
                                                            (this.state.values[rowIndex][cellIndex]===true)? "green":
                                                                "white"}}>
                                                    {cell}
                                                </td>
                                            )
                                        })
                                    } </tr>
                            )
                        })
                    }
                </table>

            </div>

            )
            }
  }

export default App;
