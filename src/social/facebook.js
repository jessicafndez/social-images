import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Facebook extends Component {
  /*
  constructor(props) {
    super(props);

    console.log("Creating facebook component");

    const facebookProfile = {
      widthDefault: 180,
      widthWeb: 160,
      heightDefault: 180,
      heightWeb: 160,
    }

    const facebookSquare = {
      widthDefault: 1200,
      widthWeb: 470,
      heightDefault: 1200,
      heightWeb: 470,
    }

    const facebookCover = {
      widthDefault: 815,
      widthWeb: 815,
      heightDefault: 315,
      heightWeb: 315,
    }
  }
  */

  changeFacebookOptions(e) {
    e.preventDefault();
    console.log("In Facebook options");
    console.log("You have select: " + e.target.value);
  } 

  render() {
    return(
      <div className="facebookContainer">
        <label>Selecciona el tipo de imagen a crear para Facebook:</label>
        <select name="facebookOptions" onClick={(e)=>this.changeFacebookOptions(e)}>
          <option value="1">Perfil</option>
          <option value="2">Cuadrada</option>
          <option value="3">Portada</option>
        </select>

        <div className="facebookBoard">
          <canvas ref="canvas"  width={200} height={200}
            resize="true"/>
        </div>
      </div>

    );
  }
}

ReactDOM.render(
  <Facebook />, document.getElementById("socialComponent")
);


export default Facebook;