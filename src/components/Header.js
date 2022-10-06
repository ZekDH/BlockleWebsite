import React, { Component } from 'react';
import PopUp from "./PopUp";



class Header extends Component {
    constructor(props) {
      super(props);

      this.state = {
        seen: false
      };

      this.togglePop = this.togglePop.bind(this);
    }


    togglePop = () => {
      console.log("toggle Pop")
      this.setState({
        seen: !this.state.seen
      });
    };

    render(){
      return  (
        <>
          <nav class="cubleHeader">
            <button onClick={this.togglePop}>Help</button>
            {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
            <div>Blockle</div>
            <div>Help2</div>
          </nav>
        </>
      )
    }
}

export default Header
