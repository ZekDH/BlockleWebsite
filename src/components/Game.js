import React from 'react';
import Box from './Box';
import global from './noise/perlin.js';
import ReactDOM from 'react-dom'
import logo from './rotate-right.png';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';


export default class Game extends React.Component{


  constructor(props) {
    super(props);
    this.state = {
      size: 5,
      rotation: 0,
      piece: 0,
      score: 0,
      day: 0,
      piecesPlaced: 0,
      lastX: 0,
      lastY: 0,
      displayBoard: [ ],
      numberBoard: [ ],
      colourBoard: [ ],
      placeOrder: [ ],
      savedScores: [ ],
      gameEnd: false
    }
    this.state.size = this.props.size;

    this.boardDisplay = this.boardDisplay.bind(this);
    this.rotateRight = this.rotateRight.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
    this.activatePlace = this.activatePlace.bind(this);
    this.rejectPlace = this.rejectPlace.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.scoreCheck = this.scoreCheck.bind(this);
    this.checkFinish = this.checkFinish.bind(this);

    this.placeSquare = this.placeSquare.bind(this);
    this.placeLine = this.placeLine.bind(this);
    this.placeRightElbow = this.placeRightElbow.bind(this);
    this.placeLeftElbow = this.placeLeftElbow.bind(this);
    this.placeJunction = this.placeJunction.bind(this);
    this.placeZigZag = this.placeZigZag.bind(this);
    this.place = this.place.bind(this);
    this.rejectPlace = this.rejectPlace.bind(this);
    this.createColourBoard = this.createColourBoard.bind(this);
    this.clipboardCopy = this.clipboardCopy.bind(this);
    this.undefCheck = this.undefCheck.bind(this);
    this.generateBoard = this.generateBoard.bind(this);
    this.generatePlace = this.generatePlace.bind(this);
    this.generatePiece = this.generatePiece.bind(this);
    this.rotateLeftCallback = this.rotateLeftCallback.bind(this);
    this.rotateRightCallback = this.rotateRightCallback.bind(this);
    this.updateCall = this.updateCall.bind(this);

    let today = new Date();
    let day = (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(today.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    this.state.day = day;
    global.noise.seed(day);

    // for(let y = 0; y < this.state.size; y++){
    //   const row = [ ];
    //   for(let x = 0; x < this.state.size; x++){
    //     let dist = Math.sqrt(Math.pow(this.state.size/2 - x,2) + Math.pow(this.state.size/2 - y,2));
    //     let perlinStack = global.noise.perlin2(x+100 / 10, y+100 / 10) - global.noise.perlin2(x / 10, y / 10);
    //
    //     if((dist + (perlinStack*2.6)) > this.state.size/2){
    //       row.push(-1);
    //     }else{
    //       row.push(0);
    //     }
    //   }
    //   this.state.numberBoard.push(row);
    // }

    for(let y = 0; y < this.state.size; y++){
      const row = [ ];
      for(let x = 0; x < this.state.size; x++){
        row.push(-1);
      }
      this.state.numberBoard.push(row);
    }

    let storedDay = window.localStorage.getItem("BlockleGameDay" + String(this.state.size));
    let storedFinish = window.localStorage.getItem("BlockleGameFinishedToday" + String(this.state.size));

    if(String(storedDay) === String(this.state.day) && String(storedFinish) === String(true)){
      console.log("Render Storage Check")
      this.state.gameEnd = true;
      this.state.score = window.localStorage.getItem("BlockleGameScore" + String(this.state.size));
    }

    this.generateBoard();
    this.state.piece = this.state.placeOrder[0];
    const data = JSON.parse(window.localStorage.getItem("chart" + String(this.state.size)) || "[]");
    window.localStorage.setItem("chart" + String(this.state.size), JSON.stringify(data));
  }

  boardDisplay(){
    const Board = [ ];

    for(let y = 0; y < this.state.size; y++){
      const row = [ ]
      for(let x = 0; x < this.state.size; x++){
        let colourCode = "";
        const boxStyle = {
          backgroundColor: "#fff000",
          borderRadius: "10%",
          contentAlign: "center",
          height: "90%",
          aspectRatio: "1/1",
          margin: "0.25%"
        };

        colourCode = this.state.colourBoard[y][x];

        boxStyle.backgroundColor = colourCode;
        boxStyle.margin = (1 * (5/this.state.size)).toString() + "%";

        const obj = <Box colour={boxStyle} xLoc={y} yLoc={x} id={this.state.numberBoard[y][x]} placeFunc={this.activatePlace} rejectFunc={this.rejectPlace} />
        row.push(obj);
      }

      let rowScale = (100/this.state.size).toString() + "%";
      Board.push(
        <div style={{display: "flex", justifyContent: "center", height: rowScale}}>
          {row}
        </div>
      );
    }

    this.setState({ displayBoard: Board });
  }

  generateBoard(){
    let PiecesValue = 0;
    let boardPiecesPlaced = 0;
    let iterations = 0;
    const placeSeq = [ ];

    while(PiecesValue <= ((this.state.size * this.state.size)*0.7) && iterations <= 500){
      var rng = new Math.seedrandom(this.state.day.toString() + boardPiecesPlaced.toString());
      let newVal = Math.floor(rng.quick() * 6);
      iterations = iterations + 1;


      if(newVal === 0){
        //69
        let placeFound = this.generatePiece(newVal, boardPiecesPlaced);
        if(!placeFound){
          PiecesValue = PiecesValue + 4;
          placeSeq.push(newVal);
        }
        boardPiecesPlaced = boardPiecesPlaced + 69;
      }else if(newVal === 1){
        //34
        let placeFound = this.generatePiece(newVal, boardPiecesPlaced);
        if(!placeFound){
          PiecesValue = PiecesValue + 4;
          placeSeq.push(newVal);
        }
        boardPiecesPlaced = boardPiecesPlaced + 34;
      }else if(newVal === 2){
        //15
        let placeFound = this.generatePiece(newVal, boardPiecesPlaced);
        if(!placeFound){
          PiecesValue = PiecesValue + 4;
          placeSeq.push(newVal);
        }
        boardPiecesPlaced = boardPiecesPlaced + 15;
      }else if(newVal === 3){
        //87
        let placeFound = this.generatePiece(newVal, boardPiecesPlaced);
        if(!placeFound){
          PiecesValue = PiecesValue + 4;
          placeSeq.push(newVal);
        }
        boardPiecesPlaced = boardPiecesPlaced + 87;
      }else if(newVal === 4){
        //73
        let placeFound = this.generatePiece(newVal, boardPiecesPlaced);
        if(!placeFound){
          PiecesValue = PiecesValue + 4;
          placeSeq.push(newVal);
        }
        boardPiecesPlaced = boardPiecesPlaced + 73;
      }else if(newVal === 5){
        //47
        let placeFound = this.generatePiece(newVal, boardPiecesPlaced);
        if(!placeFound){
          PiecesValue = PiecesValue + 4;
          placeSeq.push(newVal);
        }
        boardPiecesPlaced = boardPiecesPlaced + 47;
      }

    }
    this.state.placeOrder = placeSeq;
  }

  generatePiece(pieceType, pPlaced){

    var rng = new Math.seedrandom(this.state.day.toString() + pieceType.toString() + pPlaced.toString());
    let x = Math.floor(rng.quick() * this.state.size);
    rng = new Math.seedrandom(this.state.day.toString() + pieceType.toString() + pPlaced.toString() + "5");
    let y = Math.floor(rng.quick() * this.state.size);

    rng = new Math.seedrandom(this.state.day.toString() + pieceType.toString() + pPlaced.toString() + "rotation");
    let rot = Math.floor(rng.quick() * 4);
    let rotationFound = true;


    if(pieceType === 0 && rotationFound === true){
      rotationFound = this.placeSquare(x, y, "#000000", false, true, rot, true);
    }else if(pieceType === 1 && rotationFound === true){
      rotationFound = this.placeJunction(x, y, "#000000", false, true, rot, true);
    }else if(pieceType === 2 && rotationFound === true){
      rotationFound = this.placeRightElbow(x, y, "#000000", false, true, rot, true);
    }else if(pieceType === 3 && rotationFound === true){
      rotationFound = this.placeLeftElbow(x, y, "#000000", false, true, rot, true);
    }else if(pieceType === 4 && rotationFound === true){
      rotationFound = this.placeLine(x, y, "#000000", false, true, rot, true);
    }else if(pieceType === 5 && rotationFound === true){
      rotationFound = this.placeZigZag(x, y, "#000000", false, true, rot, true);
    }


    return rotationFound;
  }

  createColourBoard(){
    this.setState({ colourBoard: [] });
    const Board = this.state.colourBoard;
    for(let y = 0; y < this.state.size; y++){
      const row = [ ];
      for(let x = 0; x < this.state.size; x++){
        if(this.state.numberBoard[y][x] === 0){
          row.push("#ffffff30");
        }else if(this.state.numberBoard[y][x] === -1){
          row.push("#ffffff00");
        }
      }
      Board.push(row);
    }

    this.setState({ colourBoard: Board });
  }

  rotateLeft(){
    if(this.state.rotation === 0){
      this.setState({
        rotation: 3
      });
    }else{
      this.setState({
        rotation: this.state.rotation - 1
      });
    }

    this.updateCall();
    this.rejectPlace(this.state.lastY, this.state.lastX);
    this.activatePlace(this.state.lastY, this.state.lastX, true);
  }

  rotateRight(){
    if(this.state.rotation === 3){
      this.setState({
        rotation: 0
      });
    }else{
      this.setState({
        rotation: this.state.rotation + 1
      });
    }

    this.updateCall();
    this.rejectPlace(this.state.lastY, this.state.lastX);
    this.activatePlace(this.state.lastY, this.state.lastX, true);
  }

  activatePlace(y, x, temp){
    let newVal = this.state.placeOrder[this.state.piecesPlaced + 1];
    let piecePlaced = false;

    this.setState({
      lastX: x,
      lastY: y
    });

    if(this.state.piece === 0){
      let boolCheck = this.placeSquare(x, y, "#eb1d13", temp, false, 0, false);
      if(!boolCheck){
        this.setState({
          piece: newVal,
          piecesPlaced: this.state.piecesPlaced + 1,
        });

        piecePlaced = true;
      }
    }else if(this.state.piece === 1){
      let boolCheck = this.placeJunction(x, y, "#08c51c", temp, false, 0, false);
      if(!boolCheck){
        this.setState({
          piece: newVal,
          piecesPlaced: this.state.piecesPlaced + 1,
        });

        piecePlaced = true;
      }
    }else if(this.state.piece === 2){
      let boolCheck = this.placeRightElbow(x, y, "#7a04f0", temp, false, 0, false);
      if(!boolCheck){
        this.setState({
          piece: newVal,
          piecesPlaced: this.state.piecesPlaced + 1
        });

        piecePlaced = true;
      }
    }else if(this.state.piece === 3){
      let boolCheck = this.placeLeftElbow(x, y, "#0dbace", temp, false, 0, false);
      if(!boolCheck){
        this.setState({
          piece: newVal,
          piecesPlaced: this.state.piecesPlaced + 1
        });

        piecePlaced = true;
      }
    }else if(this.state.piece === 4){
      let boolCheck = this.placeLine(x, y, "#ebde13", temp, false, 0, false);
      if(!boolCheck){
        this.setState({
          piece: newVal,
          piecesPlaced: this.state.piecesPlaced + 1
        });

        piecePlaced = true;
      }
    }else if(this.state.piece === 5){
      let boolCheck = this.placeZigZag(x, y, "#e115a9", temp, false, 0, false);
      if(!boolCheck){
        this.setState({
          piece: newVal,
          piecesPlaced: this.state.piecesPlaced + 1
        });

        piecePlaced = true;
      }
    }


    this.boardDisplay();
    if(piecePlaced){
      this.checkFinish(newVal);
      this.scoreCheck();
     }
  }

  checkFinish(inputPiece){
    let Sum = 0;
    let TotalLocations = 0;

    for(let x = 0; x < this.state.size; x++){
      for(let y = 0; y < this.state.size; y++){
        if(this.state.numberBoard[x][y] === 0){
          let foundCheck = 4;
          TotalLocations = TotalLocations + 1;
          for(let r = 0; r < 4; r++){
            let foundError = false;
            if(inputPiece === 0){ foundError = this.placeSquare(x, y, "#eb1d13", false, true, r, false);  }
            if(inputPiece === 1){ foundError = this.placeJunction(x, y, "#08c51c", false, true, r, false);  }
            if(inputPiece === 2){ foundError = this.placeRightElbow(x, y, "#7a04f0", false, true, r, false);  }
            if(inputPiece === 3){ foundError = this.placeLeftElbow(x, y, "#0dbace", false, true, r, false);  }
            if(inputPiece === 4){ foundError = this.placeLine(x, y, "#ebde13", false, true, r, false);  }
            if(inputPiece === 5){ foundError = this.placeZigZag(x, y, "#e115a9", false, true, r, false);  }
            if(foundError === true){
              foundCheck = foundCheck - 1;
            }
          }

          if(foundCheck === 0){
            Sum = Sum + 1;
          }
        }
      }
    }

    if(TotalLocations === Sum){
      const data = JSON.parse(window.localStorage.getItem("chart" + String(this.state.size)) || "[]");
      let dayData = {
          day: this.state.day,
          score: this.scoreCheck()
      }
      data.push(dayData);

      window.localStorage.setItem("chart" + String(this.state.size), JSON.stringify(data));
      window.localStorage.setItem("BlockleGameDay" + String(this.state.size), this.state.day);
      window.localStorage.setItem("BlockleGameScore" + String(this.state.size), this.state.score);
      window.localStorage.setItem("BlockleGameFinishedToday" + String(this.state.size), true);
      this.setState({
        gameEnd: true,
        savedScores: data,
      });
    }

  }

  placeSquare(x, y, col, temp, check, inputRot, generate){
    let rot = this.state.rotation;
    if(check === true){
      rot = inputRot;
    }
    let dir = [[0,0],[0,0],[0,0],[0,0]]

    let up = [[0,0],[0,1],[1,0],[1,1]];
    let right = [[0,0],[1,0],[0,-1],[1,-1]];
    let down = [[0,0],[0,-1],[-1,0],[-1,-1]];
    let left = [[0,0],[-1,0],[0,1],[-1,1]];

    if(rot === 0){
      dir = up;
    }else if(rot === 1){
      dir = right;
    }else if(rot === 2){
      dir = down;
    }else if(rot === 3){
      dir = left;
    }

    if(generate === true){
      return this.generatePlace(x, y, dir, col, temp, check);
    }else{
      return this.place(x, y, dir, col, temp, check);
    }
  }

  placeJunction(x, y, col, temp, check, inputRot, generate){
    let rot = this.state.rotation;
    if(check === true){
      rot = inputRot;
    }
    let dir = [[0,0],[0,0],[0,0],[0,0]]

    let up = [[0,0],[1,0],[-1,0],[0,1]];
    let right = [[0,0],[1,0],[0,-1],[0,1]];
    let down = [[0,0],[1,0],[-1,0],[0,-1]];
    let left = [[0,0],[0,1],[-1,0],[0,-1]];

    if(rot === 0){
      dir = up;
    }else if(rot === 1){
      dir = right;
    }else if(rot === 2){
      dir = down;
    }else if(rot === 3){
      dir = left;
    }

    if(generate === true){
      return this.generatePlace(x, y, dir, col, temp, check);
    }else{
      return this.place(x, y, dir, col, temp, check);
    }
  }

  placeRightElbow(x, y, col, temp, check, inputRot, generate){
    let rot = this.state.rotation;
    if(check === true){
      rot = inputRot;
    }
    let dir = [[0,0],[0,0],[0,0],[0,0]]

    let up = [[-1,0],[0,0],[1,0],[1,1]];
    let right = [[1,-1],[0,-1],[0,0],[0,1]];
    let down = [[-1,-1],[1,0],[0,0],[-1,0]];
    let left = [[-1,1],[0,-1],[0,0],[0,1]];

    if(rot === 0){
      dir = up;
    }else if(rot === 1){
      dir = right;
    }else if(rot === 2){
      dir = down;
    }else if(rot === 3){
      dir = left;
    }

    if(generate === true){
      return this.generatePlace(x, y, dir, col, temp, check);
    }else{
      return this.place(x, y, dir, col, temp, check);
    }
  }

  placeLeftElbow(x, y, col, temp, check, inputRot, generate){
    let rot = this.state.rotation;
    if(check === true){
      rot = inputRot;
    }
    let dir = [[0,0],[0,0],[0,0],[0,0]]

    let up = [[-1,0],[0,0],[1,0],[1,-1]];
    let right = [[-1,-1],[0,-1],[0,0],[0,1]];
    let down = [[-1,1],[1,0],[0,0],[-1,0]];
    let left = [[1,1],[0,-1],[0,0],[0,1]];

    if(rot === 0){
      dir = up;
    }else if(rot === 1){
      dir = right;
    }else if(rot === 2){
      dir = down;
    }else if(rot === 3){
      dir = left;
    }

    if(generate === true){
      return this.generatePlace(x, y, dir, col, temp, check);
    }else{
      return this.place(x, y, dir, col, temp, check);
    }
  }

  placeLine(x, y, col, temp, check, inputRot, generate){
    let rot = this.state.rotation;
    if(check === true){
      rot = inputRot;
    }
    let dir = [[0,0],[0,0],[0,0],[0,0]];

    let up = [[-1,0],[0,0],[1,0],[2,0]];
    let right = [[0,-1],[0,0],[0,1],[0,2]];
    let down = [[-2,0],[1,0],[0,0],[-1,0]];
    let left = [[0,-2],[0,1],[0,0],[0,-1]];

    if(rot === 0){
      dir = up;
    }else if(rot === 1){
      dir = right;
    }else if(rot === 2){
      dir = down;
    }else if(rot === 3){
      dir = left;
    }

    if(generate === true){
      return this.generatePlace(x, y, dir, col, temp, check);
    }else{
      return this.place(x, y, dir, col, temp, check);
    }
  }

  placeZigZag(x, y, col, temp, check, inputRot, generate){
    let rot = this.state.rotation;
    if(check === true){
      rot = inputRot;
    }

    let dir = [[0,0],[0,0],[0,0],[0,0]]

    let up = [[0,0],[-1,1],[0,1],[1,0]];
    let right = [[0,0],[0,-1],[1,1],[1,0]];
    let down = [[0,0],[0,-1],[1,-1],[-1,0]];
    let left = [[0,0],[0,1],[-1,-1],[-1,0]];

    if(rot === 0){
      dir = up;
    }else if(rot === 1){
      dir = right;
    }else if(rot === 2){
      dir = down;
    }else if(rot === 3){
      dir = left;
    }

    if(generate === true){
      return this.generatePlace(x, y, dir, col, temp, check);
    }else{
      return this.place(x, y, dir, col, temp, check);
    }
  }

  undefCheck(x, y){
    let checkResult = false;
    if(x >= 0 && x < this.state.size && y >= 0 && y < this.state.size){
      return true
    }else{
      return false
    }
  }

  generatePlace(x, y, dir, colour, temp, check){
    const tempNum = this.state.numberBoard;
    let errorFound = false;

    if(
      this.undefCheck(x + dir[0][0], y + dir[0][1]) === false ||
      this.undefCheck(x + dir[1][0], y + dir[1][1]) === false ||
      this.undefCheck(x + dir[2][0], y + dir[2][1]) === false ||
      this.undefCheck(x + dir[3][0], y + dir[3][1]) === false ||
      tempNum[x + dir[0][0]][y + dir[0][1]] === 0 ||
      tempNum[x + dir[1][0]][y + dir[1][1]] === 0 ||
      tempNum[x + dir[2][0]][y + dir[2][1]] === 0 ||
      tempNum[x + dir[3][0]][y + dir[3][1]] === 0
    ){
      errorFound = true;
    }else{
      tempNum[x + dir[0][0]][y + dir[0][1]] = 0;
      tempNum[x + dir[1][0]][y + dir[1][1]] = 0;
      tempNum[x + dir[2][0]][y + dir[2][1]] = 0;
      tempNum[x + dir[3][0]][y + dir[3][1]] = 0;
    }

    this.setState({
      numberBoard: tempNum
    });

    return errorFound;
  }

  place(x, y, dir, colour, temp, check){
    this.rejectPlace(y, x);
    const tempNum = this.state.numberBoard;
    const tempColour = this.state.colourBoard;
    let errorFound = false;

    if(
      this.undefCheck(x + dir[0][0], y + dir[0][1]) === false ||
      this.undefCheck(x + dir[1][0], y + dir[1][1]) === false ||
      this.undefCheck(x + dir[2][0], y + dir[2][1]) === false ||
      this.undefCheck(x + dir[3][0], y + dir[3][1]) === false ||
      tempNum[x + dir[0][0]][y + dir[0][1]] === 1 ||
      tempNum[x + dir[1][0]][y + dir[1][1]] === 1 ||
      tempNum[x + dir[2][0]][y + dir[2][1]] === 1 ||
      tempNum[x + dir[3][0]][y + dir[3][1]] === 1 ||
      tempNum[x + dir[0][0]][y + dir[0][1]] === -1 ||
      tempNum[x + dir[1][0]][y + dir[1][1]] === -1 ||
      tempNum[x + dir[2][0]][y + dir[2][1]] === -1 ||
      tempNum[x + dir[3][0]][y + dir[3][1]] === -1
    ){
      errorFound = true;
    }else if(check === false){
      if(temp === false){
        tempNum[x + dir[0][0]][y + dir[0][1]] = 1;
        tempNum[x + dir[1][0]][y + dir[1][1]] = 1;
        tempNum[x + dir[2][0]][y + dir[2][1]] = 1;
        tempNum[x + dir[3][0]][y + dir[3][1]] = 1;
        tempColour[x + dir[0][0]][y + dir[0][1]] = colour;
        tempColour[x + dir[1][0]][y + dir[1][1]] = colour;
        tempColour[x + dir[2][0]][y + dir[2][1]] = colour;
        tempColour[x + dir[3][0]][y + dir[3][1]] = colour;


      }else{
        tempColour[x + dir[0][0]][y + dir[0][1]] = "#ffffff50";
        tempColour[x + dir[1][0]][y + dir[1][1]] = "#ffffff50";
        tempColour[x + dir[2][0]][y + dir[2][1]] = "#ffffff50";
        tempColour[x + dir[3][0]][y + dir[3][1]] = "#ffffff50";
        tempColour[x][y] = "#ffffff80";
      }
    }

    this.setState({
      numberBoard: tempNum,
      colourBoard: tempColour
    });

    this.updateCall();

    if(temp === true){  return true;  }
    return errorFound;
  }

  rejectPlace(y, x){
    const newColArray = this.state.colourBoard;

    for(let y = 0; y < this.state.size; y++){
      for(let x = 0; x < this.state.size; x++){
        if(this.state.numberBoard[y][x] === 0){
          newColArray[y][x] = "#ffffff30";
        }else if(this.state.numberBoard[y][x] === -1){
          newColArray[y][x] = "#ffffff00";
        }
      }
    }

    this.setState({
      colourBoard: newColArray
    });
  }

  scoreCheck(){
    let Sum = 0;
    let Total = 0;
    for(let x = 0; x < this.state.size; x++){
      for(let y = 0; y < this.state.size; y++){
        if(this.state.numberBoard[x][y] === 0){
          Total = Total + 1;
        }else if(this.state.numberBoard[x][y] === 1){
          Total = Total + 1;
          Sum = Sum + 1;
        }
      }
    }

    this.setState({
      score: Sum.toString() + "/" + Total.toString()
    })

    this.updateCall();
    return (Sum/Total).toFixed(2);
  }

  clipboardCopy(){
    if(this.state.size === 7){
      navigator.clipboard.writeText(
        "Blockle #" + this.state.day + " #Small" + "\n" +
        "Score: " + this.state.score + "\n" +
        "\nhttps://www.blockle.net/"
      );
    }else if(this.state.size === 13){
      navigator.clipboard.writeText(
        "Blockle #" + this.state.day + " #Medium" + "\n" +
        "Score: " + this.state.score + "\n" +
        "\nhttps://www.blockle.net/"
      );
    }else{
      navigator.clipboard.writeText(
        "Blockle #" + this.state.day + " #Large" + "\n" +
        "Score: " + this.state.score + "\n" +
        "\nhttps://www.blockle.net/"
      );
    }

  }

  updateCall(){
    this.props.updateFunc(this.state.piece, this.state.rotation, "Score: " + this.state.score);
  }

  rotateLeftCallback(){
    this.rotateLeft();
    this.rejectPlace(this.state.lastY, this.state.lastX);
    this.activatePlace(this.state.lastY, this.state.lastX, true);
  }
  rotateRightCallback(){
    this.rotateRight();
    this.rejectPlace(this.state.lastY, this.state.lastX);
    this.activatePlace(this.state.lastY, this.state.lastX, true);
  }

  handleKeyPress(e){
    if(this.props.active === "none"){ return; }
    if(e.keyCode === 39 || e.keyCode === 68){
      this.rotateRightCallback();
    }

    if(e.keyCode === 37 || e.keyCode === 65){
      this.rotateLeftCallback();
    }
  }

  componentDidMount(){
    document.addEventListener('keydown', this.handleKeyPress);
    this.createColourBoard();
    this.boardDisplay();

    const containerElement = document.getElementById("rotateContainer7");
    const rotateElement = (<React.Fragment>
      <div style={{display: "flex", fontSize: "70%", alignItems: "center", justifyContent: "center", flexWrap: "wrap", flexDirection: "column"}}>
        <button onClick={this.rotateLeftCallback} style={{cursor: "pointer", flexDirection: "column", flexWrap: "wrap", alignItems: "center", justifyContent: "center", paddingTop: "25%"}}>
          <h5 style={{fontSize: "1vw"}}>Rotate Left</h5>
          <img class="rotateIco flip" style={{width: "2.5vw"}} src={logo} alt="RotateLeftImg"></img>
        </button>
        <button onClick={this.rotateRightCallback} style={{cursor: "pointer", flexDirection: "column", flexWrap: "wrap", alignItems: "center", justifyContent: "center", paddingTop: "25%"}}>
          <h5 style={{fontSize: "1vw"}}>Rotate Right</h5>
          <img class="rotateIco" style={{width: "2.5vw"}} src={logo} alt="RotateRightImg"></img>
        </button>
      </div>
    </React.Fragment>)

    if(containerElement){
      if(this.state.size === 7){
        ReactDOM.render(rotateElement, document.getElementById("rotateContainer7"));
      }else if(this.state.size === 13){
        ReactDOM.render(rotateElement, document.getElementById("rotateContainer13"));
      }else if(this.state.size === 23){
        ReactDOM.render(rotateElement, document.getElementById("rotateContainer23"));
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  render(){
    let gameBox = "";
    let finishBox = "";

    if(this.state.gameEnd === true){
      gameBox = "none";
      finishBox = "block";
    }else{
      gameBox = "block";
      finishBox = "none";
    }


    if(this.props.active === "none"){ return(<> </>); }

    return (
      <>
        <div class="boxShadow" style={{display: finishBox, height: "100%", aspectRatio: "1/1"}}>
          <div style={{height: "100%", fontSize: "1.8vw", aspectRatio: "1/1", margin: "0.2%", alignItems:"center", justifyContent: "center", display: "flex", flexWrap: "wrap", flexDirection: "column"}}>
            <h1>Game Finished</h1>
            <h3> Final Score:   {this.state.score} </h3>
            <ResponsiveContainer width="80%" height="35%">
              <LineChart margin={{ top: 20, right: 90, left: 40, bottom: 15 }} data={this.state.savedScores}>
                <Line type="monotone" dataKey="score" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="score" />
                <YAxis />
              </LineChart>
            </ResponsiveContainer>
            <button onClick={this.clipboardCopy} style={{cursor: "pointer", fontSize: "1.3vw", borderRadius: "2%", backgroundColor: "#00000030"}}><h2>Copy to Clipboard</h2></button>
          </div>
        </div>
        <div class="boxShadow" style={{display: gameBox, height: "100%", aspectRatio: "1/1", margin: "0.2%"}}>
          {this.state.displayBoard}
        </div>
      </>
    )
  }
}
