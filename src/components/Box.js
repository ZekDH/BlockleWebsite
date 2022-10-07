import React from 'react'
import {isMobile} from 'react-device-detect';

class Box extends React.Component{
  constructor(props) {
    super(props);

    const customStyle = {
      backgroundColor: '#00000000',
      borderStyle: "solid",
      borderRadius: "3px",
      borderWidth: "5px",
      borderColor: "#ffffff80",
      height: "95%",
      width: "95%",
      margin: "0.2%"
    };


    this.state = {
      style: customStyle,
      clickInterval: 500,
      lastClick: (new Date()).getTime()
    };

    //Functions
    this.clickFunc = this.clickFunc.bind(this);
    this.hoverFunc = this.hoverFunc.bind(this);
    this.hoverExit = this.hoverExit.bind(this);
  }
  
  //Click function to call external function from the game when icon is clicked
  clickFunc(){

    if(isMobile){
      const msNow = (new Date()).getTime()
      console.info(msNow - this.state.lastClick)

      if ((msNow - this.state.lastClick) < this.state.clickInterval) {
        this.props.placeFunc(this.props.yLoc, this.props.xLoc ,false);
      }else{
        this.props.placeFunc(this.props.yLoc, this.props.xLoc ,true);
      }
      this.state.lastClick = msNow
    }else{
      this.props.placeFunc(this.props.yLoc, this.props.xLoc ,false);
    }

  }


  
  //Calls function to game logic to display header outline
  hoverFunc(){
    this.props.placeFunc(this.props.yLoc, this.props.xLoc, true);
  }
  
  //Stops highlighting this piece
  hoverExit(){
    this.props.rejectFunc(this.props.yLoc, this.props.xLoc);
  }
  
  
  //This props colour is used to update colour quickly within realtime
  render(){
    return (
      <button onClick={this.clickFunc} onMouseOver={this.hoverFunc} onMouseOut={this.hoverExit} style={this.props.colour}>

      </button>
    );
  }

}

export default Box;
