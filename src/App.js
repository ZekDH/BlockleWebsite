import './App.css';
import React from 'react';
import Game from './components/Game'

import helpLogo from './components/interrogation.png';
import menuLogo from './components/menu-burger.png';
import PieceDisplay from './components/PieceDisplay'
import {BrowserView, MobileView} from 'react-device-detect';


export default class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      piece: 0,
      rotation: 0,
      score: 0,
      showHelp: "block",
      showGame: "none",
      showMenu: "none",
      gameSize: 7,
      showFirstGame: "none",
      showSecondGame: "none",
      showThirdGame: "none"
    }

    this.changeVarFunc = this.changeVarFunc.bind(this);
    this.setHelp = this.setHelp.bind(this);
    this.setGame = this.setGame.bind(this);
    this.setMenu = this.setMenu.bind(this);

    this.easy = this.easy.bind(this);
    this.normal = this.normal.bind(this);
    this.hard = this.hard.bind(this);

  }

  componentDidMount(){

  }

  changeVarFunc(p, r, s){
    console.log("Change Var Func Called");
    this.setState({
      piece: p,
      rotation: r,
      score: s,
    });
  }

  setHelp(){
    this.setState({
      showHelp: "block",
      showMenu: "none",
      showFirstGame: "none",
      showSecondGame: "none",
      showThirdGame: "none"
    });
  }

  setMenu(){
    this.setState({
      showHelp: "none",
      showMenu: "block",
      showFirstGame: "none",
      showSecondGame: "none",
      showThirdGame: "none"
    });
  }

  setGame(){
    this.setState({
      showHelp: "none",
      showMenu: "none",
    });

    if(this.state.gameSize === 7){
      this.setState({
        showFirstGame: "block",
        showSecondGame: "none",
        showThirdGame: "none",
        showHelp: "none",
        showMenu: "none"
      });
    }else if(this.state.gameSize === 13){
      this.setState({
        showFirstGame: "none",
        showSecondGame: "block",
        showThirdGame: "none",
        showHelp: "none",
        showMenu: "none"
      });
    }else if(this.state.gameSize === 23){
      this.setState({
        showFirstGame: "none",
        showSecondGame: "none",
        showThirdGame: "block",
        showHelp: "none",
        showMenu: "none"
      });
    }
  }

  easy(){
    this.setState({
      showFirstGame: "block",
      showSecondGame: "none",
      showThirdGame: "none",
      showHelp: "none",
      showMenu: "none",
      gameSize: 7
    });
  }

  normal(){
    this.setState({
      showFirstGame: "none",
      showSecondGame: "block",
      showThirdGame: "none",
      showHelp: "none",
      showMenu: "none",
      gameSize: 13
    });
  }

  hard(){
    this.setState({
      showFirstGame: "none",
      showSecondGame: "none",
      showThirdGame: "block",
      showHelp: "none",
      showMenu: "none",
      gameSize: 23
    });
  }


  render(){
    return (
      <>
        <MobileView>
          <div style={{display: "flex", flexWrap: "wrap", flexDirection: "column", justifyContent: "center"}}>
            <div style={{height:"10%", margin:"1%", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", flexDirection: "column"}}>
              <div style={{height:"20%"}}>
                  <h1 onClick={this.setGame} style={{display: "flex", cursor: "pointer", fontSize: "4vw", alignItems: "center", justifyContent: "center"}}>
                    BLOCKLE
                  </h1>
                  <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <button onClick={this.setHelp} style={{cursor: "pointer"}}><img class="rotateIco" src={helpLogo} alt="HelpLogo" style={{width: "2.5vw"}}></img></button>
                    <button onClick={this.setMenu} style={{cursor: "pointer"}}><img class="rotateIco" src={menuLogo} alt="MenuLogo" style={{width: "2.5vw"}}></img></button>
                  </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", flexDirection: "row"}}>
                  <div>
                    <div style={{width: "20vw", marginRight: "5vw"}}>
                      <h5 id="scoreText" style={{fontSize: "1.2vw", display: "flex", alignItems: "center", justifyContent: "center" }}>{this.state.score}</h5>
                      <PieceDisplay rot={this.state.rotation} piece={this.state.piece} />
                    </div>
                  </div>
                  <div id="rotateContainer7" style={{display: this.state.showFirstGame}}>
                  </div>
                  <div id="rotateContainer13" style={{display: this.state.showSecondGame}}>
                  </div>
                  <div id="rotateContainer23" style={{display: this.state.showThirdGame}}>
                  </div>
                </div>
              </div>
            </div>
            <div style={{height:"74vh", display: "flex",flexDirection: "column", flexWrap: "wrap", justifyContent: "center", alignItems: "center"}}>
              <div style={{display: this.state.showHelp}} class="mobileBoxBrowser">
                <div class="boxShadow" style={{height: "100%", fontSize: "1.7vw", aspectRatio: "1/1", margin: "0.2%", alignItems:"center", justifyContent: "center", display: "flex", flexWrap: "wrap", flexDirection: "column"}}>
                  <h1>Instructions</h1>
                  <h3>Controls</h3>
                  <p>To rotate the piece use button's above the game board</p>
                  <p>Tap blocks on the board to recieve shape placement outline</p>
                  <p>Double tap on light part of shape outline to place</p>
                  <h3>Game</h3>
                  <p>Game ends manually when user is unable to place more pieces</p>
                  <p>Final score is show above the piece display</p>
                  <p>The score is the amount of blocks occupied vs the total blocks</p>
                  <p></p>
                  <button onClick={this.setGame} style={{cursor: "pointer", fontSize: "1.8vw", borderRadius: "2%", backgroundColor: "#00000030"}}><h2>Close Instructions</h2></button>
                </div>
              </div>

              <div style={{display: this.state.showMenu}} class="mobileBoxBrowser">
                <div class="boxShadow" style={{height: "100%", fontSize: "1.7vw", aspectRatio: "1/1", margin: "0.2%", alignItems:"center", justifyContent: "center", display: "flex", flexWrap: "wrap", flexDirection: "column"}}>
                  <button onClick={this.easy} style={{cursor: "pointer", fontSize: "1.8vw", borderRadius: "2%", backgroundColor: "#00000030"}}><h2>Small</h2></button>
                  <button onClick={this.normal} style={{cursor: "pointer", fontSize: "1.8vw", borderRadius: "2%", backgroundColor: "#00000030"}}><h2>Medium</h2></button>
                  <button onClick={this.hard} style={{cursor: "pointer", fontSize: "1.8vw", borderRadius: "2%", backgroundColor: "#00000030"}}><h2>Large</h2></button>
                  <button onClick={this.setGame} style={{cursor: "pointer", fontSize: "1.8vw", borderRadius: "2%", backgroundColor: "#00000030"}}><h2>Close Menu</h2></button>
                </div>
              </div>

              <div style={{display: this.state.showFirstGame}} class="mobileBoxBrowser">
                <Game size={7} active={this.state.showFirstGame} updateFunc={this.changeVarFunc}/>
              </div>
              <div style={{display: this.state.showSecondGame}} class="mobileBoxBrowser">
                <Game size={13} active={this.state.showSecondGame} updateFunc={this.changeVarFunc}/>
              </div>
              <div style={{display: this.state.showThirdGame}} class="mobileBoxBrowser">
                <Game size={23} active={this.state.showThirdGame} updateFunc={this.changeVarFunc}/>
              </div>
            </div>
          </div>
        </MobileView>

        <BrowserView>
          <div style={{display: "flex", justifyContent: "center", height: "100vh"}}>
            <div style={{width:"10%", margin:"1%", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", flexDirection: "column"}}>
              <div style={{width:"100%"}}>
                <div style={{marginBottom: "25%"}}>
                  <h1 onClick={this.setGame} style={{display: "flex", cursor: "pointer", fontSize: "1.8vw", alignItems: "center", justifyContent: "center"}}>
                    BLOCKLE
                  </h1>
                  <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", flexDirection: "row"}}>
                    <button onClick={this.setHelp} style={{cursor: "pointer"}}><img class="rotateIco" src={helpLogo} alt="HelpLogo" style={{width: "1.5vw"}}></img></button>
                    <button onClick={this.setMenu} style={{cursor: "pointer"}}><img class="rotateIco" src={menuLogo} alt="MenuLogo" style={{width: "1.5vw"}}></img></button>
                  </div>
                </div>
                <div>
                  <h5 id="scoreText" style={{fontSize: "1.2vw", display: "flex", alignItems: "center", justifyContent: "center" }}>{this.state.score}</h5>
                  <div id="pieceContainer">
                    <PieceDisplay rot={this.state.rotation} piece={this.state.piece} />
                  </div>
                </div>
                <div id="rotateContainer7" style={{display: this.state.showFirstGame}}>
                </div>
                <div id="rotateContainer13" style={{display: this.state.showSecondGame}}>
                </div>
                <div id="rotateContainer23" style={{display: this.state.showThirdGame}}>
                </div>
              </div>
            </div>
            <div style={{width:"90%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center"}}>
              <div style={{display: this.state.showHelp}} class="gameBoxBrowser">
                <div class="boxShadow" style={{height: "100%", fontSize: "1.1vw", aspectRatio: "1/1", margin: "0.2%", alignItems:"center", justifyContent: "center", display: "flex", flexWrap: "wrap", flexDirection: "column"}}>
                  <h1>Instructions</h1>
                  <h3>Controls</h3>
                  <p>To rotate the piece use (A / D) or (Left arrow / Right arrow)</p>
                  <p>Hover over blocks on the board to recieve shape placement outline</p>
                  <p>Click on light part of shape outline to place</p>
                  <h3>Game</h3>
                  <p>Game ends manually when user is unable to place more pieces</p>
                  <p>Final score is show above the piece display</p>
                  <p>The score is the amount of blocks occupied vs the total blocks</p>
                  <p></p>
                  <button onClick={this.setGame} style={{cursor: "pointer", fontSize: "0.8vw", borderRadius: "2%", backgroundColor: "#00000030"}}><h2>Close Instructions</h2></button>
                </div>
              </div>

              <div style={{display: this.state.showMenu}} class="gameBoxBrowser">
                <div class="boxShadow" style={{height: "100%", fontSize: "1.1vw", aspectRatio: "1/1", margin: "0.2%", alignItems:"center", justifyContent: "center", display: "flex", flexWrap: "wrap", flexDirection: "column"}}>
                  <button onClick={this.easy} style={{cursor: "pointer", fontSize: "0.8vw", borderRadius: "2%", backgroundColor: "#00000030"}}><h2>Small</h2></button>
                  <button onClick={this.normal} style={{cursor: "pointer", fontSize: "0.8vw", borderRadius: "2%", backgroundColor: "#00000030"}}><h2>Medium</h2></button>
                  <button onClick={this.hard} style={{cursor: "pointer", fontSize: "0.8vw", borderRadius: "2%", backgroundColor: "#00000030"}}><h2>Large</h2></button>
                  <button onClick={this.setGame} style={{cursor: "pointer", fontSize: "0.8vw", borderRadius: "2%", backgroundColor: "#00000030"}}><h2>Close Menu</h2></button>
                </div>
              </div>

              <div style={{display: this.state.showFirstGame}} class="gameBoxBrowser">
                <Game size={7} active={this.state.showFirstGame} updateFunc={this.changeVarFunc}/>
              </div>
              <div style={{display: this.state.showSecondGame}} class="gameBoxBrowser">
                <Game size={13} active={this.state.showSecondGame} updateFunc={this.changeVarFunc}/>
              </div>
              <div style={{display: this.state.showThirdGame}} class="gameBoxBrowser">
                <Game size={23} active={this.state.showThirdGame} updateFunc={this.changeVarFunc}/>
              </div>
            </div>
          </div>
        </BrowserView>
      </>
    );
  }

}
