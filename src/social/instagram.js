import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Instagram extends Component{

  /*
  constructor(props) {
    super(props);

    console.log("Creating instagram component");

    const instagramProfile = {
      widthDefault: 110,
      widthWeb: 180,
      heightDefault: 110,
      heightWeb: 180,
    }

    const instagramSquare = {
      widthDefault: 1080,
      widthWeb: 640,
      heightDefault: 1080,
      heightWeb: 640,
    }

    const instagramHorizontal = {
      widthDefault: 1080,
      widthWeb: 640,
      heightDefault: 566,
      heightWeb: 400,
    }

    const instagramVertical = {
      widthDefault: 1080,
      widthWeb: 600,
      heightDefault: 1350,
      heightWeb: 749,
    }
  }
  */

  changeInstagramOptions(e) {
    e.preventDefault();
    console.log("In Instagram Options");
    console.log("you have select: " + e.target.value);
  }

  render() {
    return(
      <div className="instagramContainer">
        <label>Selecciona el tipo de imagen a crear para Instagram:</label>
        <select name=""  onClick={(e)=>this.changeInstagramOptions(e)}>
          <option value="1">Perfil</option>
          <option value="2">Cuadrada</option>
          <option value="3">Horizontal</option>
          <option value="4">Vertical</option>
        </select>
      </div>
    );
  }
}


ReactDOM.render(
  <Instagram />, document.getElementById("socialComponent")
);


export default Instagram;