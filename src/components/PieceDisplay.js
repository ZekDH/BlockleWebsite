import React from 'react';

const backgroundBoxStyle = {
  width: "100%",
  aspectRatio: "1/1",
  backgroundColor: "#00000000"
};

export default class PieceDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      size: 5,
      rotation: this.props.rot,
      piece: this.props.piece,
      colourArray: [ ],
      displayArray: [ ]
    }

    this.colourReset = this.colourReset.bind(this);
    this.colourBoard = this.colourBoard.bind(this);
    this.displayBoard = this.displayBoard.bind(this);

    this.place = this.place.bind(this);
    this.placeLine = this.placeLine.bind(this);
    this.placeSquare = this.placeSquare.bind(this);
    this.placeZigZag = this.placeZigZag.bind(this);
    this.placeJunction = this.placeJunction.bind(this);
    this.placeLeftElbow = this.placeLeftElbow.bind(this);
    this.placeRightElbow = this.placeRightElbow.bind(this);
  }

  colourReset(){

    const Board = this.state.colourArray;
    for(let x = 0; x < this.state.size; x++){
      const row = [];
      for(let y = 0; y < this.state.size; y++){
        row.push("#ffffff99");
      }
      Board.push(row);
    }

    this.setState({colourArray: Board}, () => {
      //console.log(this.state.colourArray[0][0] + " it worksss");
    });
  }

  colourBoard(){

    for(let x = 0; x < this.state.size; x++){
      for(let y = 0; y < this.state.size; y++){
        this.state.colourArray[x][y]= "#ffffff99";
      }

    }
  }

  displayBoard(){
    const Board = [];
    for(let x = 0; x < this.state.size; x++){
      const row = [];
      for(let y = 0; y < this.state.size; y++){

        const customStyle = {
          backgroundColor: "#fff000",
          borderRadius: "10%",
          contentAlign: "center",
          height: "90%",
          aspectRatio: "1/1",
          margin: "1%"
        };

        customStyle.backgroundColor = this.state.colourArray[x][y];
        row.push(
          <div style={customStyle}></div>
        );
      }
      let rowScale = (100/5).toString() + "%";
      Board.push(<div style={{display: "flex", justifyContent: "center", height: rowScale}}>{row}</div>)
    }
    this.setState({displayArray: Board}, () => {
      //console.log("Display Board Set");
    });
  }

  componentDidMount(){
    this.colourReset();

    this.setState({
      rotation: this.props.rot,
      piece: this.props.piece
    });

    if(this.state.piece === 0){ this.placeSquare("#eb1d13", this.state.rotation);  }
    if(this.state.piece === 1){ this.placeJunction("#08c51c", this.state.rotation);  }
    if(this.state.piece === 2){ this.placeRightElbow("#7a04f0", this.state.rotation);  }
    if(this.state.piece === 3){ this.placeLeftElbow("#0dbace", this.state.rotation);  }
    if(this.state.piece === 4){ this.placeLine("#ebde13", this.state.rotation);  }
    if(this.state.piece === 5){ this.placeZigZag("#e115a9", this.state.rotation);  }

  }

  placeSquare(col, rotation){
    let rot = rotation;
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

    this.place(dir, col);
  }

  placeJunction(col, rotation){
    let rot = rotation;
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

    this.place(dir, col);
  }

  placeRightElbow(col, rotation){
    let rot = rotation;
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

    this.place(dir, col);
  }

  placeLeftElbow(col, rotation){
    let rot = rotation;
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

    this.place(dir, col);
  }

  placeLine(col, rotation){
    let rot = rotation;
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

    this.place(dir, col);
  }

  placeZigZag(col, rotation){
    let rot = rotation;
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

    this.place(dir, col);
  }

  place(dir, colour){
    const colBoard = this.state.colourArray;

    colBoard[2 + dir[0][0]][2 + dir[0][1]] = colour;
    colBoard[2 + dir[1][0]][2 + dir[1][1]] = colour;
    colBoard[2 + dir[2][0]][2 + dir[2][1]] = colour;
    colBoard[2 + dir[3][0]][2 + dir[3][1]] = colour;

    this.setState({ colourArray: colBoard }, () => {});
    this.displayBoard();
  }

  render() {
    if(this.props.rot !== this.state.rotation || this.props.piece !== this.state.piece){
      this.colourBoard();

      this.setState({
        rotation: this.props.rot,
        piece: this.props.piece,
        colourArray: [ ],
        displayArray: [ ]
      });

      if(this.props.piece === 0){ this.placeSquare("#eb1d13", this.props.rot);  }
      if(this.props.piece === 1){ this.placeJunction("#08c51c", this.props.rot);  }
      if(this.props.piece === 2){ this.placeRightElbow("#7a04f0", this.props.rot);  }
      if(this.props.piece === 3){ this.placeLeftElbow("#0dbace", this.props.rot);  }
      if(this.props.piece === 4){ this.placeLine("#ebde13", this.props.rot);  }
      if(this.props.piece === 5){ this.placeZigZag("#e115a9", this.props.rot);  }
    }

    return (
      <>
        <div class="boxShadow" style={backgroundBoxStyle}>
          {this.state.displayArray}
        </div>

      </>
    );
  }
}
