import React, { Component } from 'react';
import '../index.css';
import '../css/board.css';

import Facebook from '../social/facebook';
import Instagram from '../social/instagram';
import Twitter from '../social/twitter';

import SocialGeneral from '../social/socialGeneral.js'

// function SocialComponent(props) {
//     console.log("props");
//     console.log(props.thisSocialId);
//     console.log("-*-");

//     if(props.thisSocialId == 1) {
//         return(
//             <Facebook />
//         );
//     }
//     else if(props.thisSocialId == 2){
//         return(
//             <Instagram /> 
//         );
//     }
//     else if(props.thisSocialId == 3){
//         return(
//             <Twitter />
//         );
//     }
// }

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            file: '', 
            imagePreviewUrl: '', 
            dragging: false, 
            socialName: 'Facebook',
            socialId: 1,
            canvasWidth: 470,
            canvasHeight: 470
        };   
    }

    _changeSocialPlatform(e) {
        e.preventDefault();

        if (e.target.value == 1) {
            this.setState({socialName: 'Facebook', socialId: 1});
        }
        else if (e.target.value == 2) {
            this.setState({socialName: 'Instagram', socialId: 2});
        }
        else if (e.target.value == 3) {
            this.setState({socialName: 'Twitter', socialId: 3});
        }

        console.log("Changin to: " + e.target.value);
        this.render();
    }

    render() {
        return(
            <div className="boardContainer">
                <div className="componentBox">
                    <label className="lblSocialPlatform">Selecciona la red social:</label>
                    <select name="socialPlatform" onChange={(e)=>this._changeSocialPlatform(e)}>
                        <option value="1">Facebook</option>
                        <option value="2">Instagram</option>
                        <option value="3">Twitter</option>
                    </select>
                </div>
                <div className="">
                    <SocialGeneral thisSocialId={this.state.socialId}/>
                </div>
            </div>
        );
    }
}

export default Board;