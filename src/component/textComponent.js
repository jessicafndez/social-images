import React, { Component } from 'react';
import FaPlus from 'react-icons/lib/fa/plus';
import FaMinus from 'react-icons/lib/fa/minus';

import '../css/text_component.css'

class TextComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textString: '',
            textColor: '#000000',
            textSize: 16,
            textStyle: 'Arial',
            textPosX: 0,
            textPosY: 0
        }
        
        this.fonts = ['Andale Mono', 'Arial', 'Arial Black', 'Comic Sans MS', 'Georgia', 'Impact',
         'Times New Roman', 'Tahoma', 'Verdana', 'Webdings'
        ]
    
    }

    handleAddText(e) {
        this.setState({textString: e.target.value});
       // this.props.text(e.target.value);
    }

    handleAddColor(e) {
        this.setState({textColor: e.target.value});
    }

    handleAddFontStyle(e) {
        this.setState({textStyle: e.target.value});
    }

    handleAddSize(e) {
        this.setState({textSize: e.target.value});
    }   

    sendValues(e) {
        this.props.sendValues(this.state);
    }

    removeElement(e) {
        //TODO
    }

    render() {
        var appFonts = [];
        for (let i=0; i < this.fonts.length; i++){
            appFonts.push(<option value={i} key={i}>{this.fonts[i]}</option>)
        }
        return(
            <div className="textContainer">
                <div> 
                    <div className="textContainerRow">
                        <label htmlFor="newText" className="imageText">Texto de la imágen:</label><br/>
                        <input className="newText" name="newText" id="newText"
                        onChange={this.props.addCanvasText}   
                        />
                    </div>
                    <div className="textContainerRow">
                        <div className="">
                            <label htmlFor="newColor" className="imageText">Color:</label><br/>
                            <input className="" id="newColor" name="newColor" placeholder="#000000"
                            onChange={this.props.addCanvasTextColor}/>
                        </div>
                        <div className="">
                            <label htmlFor="textSize" className="imageText">Medida:</label><br/>
                            <input className="textSize" id="textSize" name="textSize" placeholder="16"
                            onChange={this.props.addCanvasTextSize}/>px
                        </div>
                        <div className="">
                            <label htmlFor="textStyle" className="imageText">Estilo:</label><br/>
                            <select>
                                {appFonts}
                            </select>
                        </div>
                    </div>
                    <div className="textContainerRow">
                        <button className="appBtn">
                            Subir <FaPlus/>
                        </button>
                        <button className="appBtn">
                            Bajar <FaMinus/>
                        </button>
                    </div>
                    {/* 
                    <button onClick={(e)=>this.sendValues(e)}>Add</button>
                    */}
                    <button 
                        onClick={this.props.delText}>
                        Remove
                    </button>
                </div>
            </div>
        );
    }
}

export default TextComponent;