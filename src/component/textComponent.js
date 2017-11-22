import React, { Component } from 'react';
import FaPlus from 'react-icons/lib/fa/plus';
import FaMinus from 'react-icons/lib/fa/minus';
import FaTrash from 'react-icons/lib/fa/trash';

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

        this.fonts = ['Andale Mono', 'Arial', 'Arial Black', 'Arial Italic',
            'Comic Sans MS', 'Georgia', 'Georgia Italic', 'Impact',
            'Times New Roman', 'Tahoma', 'Verdana'
        ]

        this.colors = [
            {name: 'Negro', rgb: '#000000'},
            {name: 'Invermercado', rgb: '#218aa8'},
            {name: 'Blanco', rgb: '#ffffff'},
            {name: 'Gris', rgb: '#4c4c4c'}
        ]
    }

    handleAddText(e) {
        this.setState({textString: e.target.value});
       // this.props.text(e.target.value);
    }

    handleAddColor(e) {
        this.setState({textColor: e.target.value});
    }

    handleAddSize(e) {
        this.setState({textSize: e.target.value});
    }   

    handleAddStyle(e) {
        let fontName = this.fonts[parseInt(e.target.value)];
        this.setState({textStyle: fontName});
    }

    handleAddTextTop(e) {

    }

    sendValues(e) {
        this.props.sendValues(this.state);
    }

    removeElement(e) {
        //TODO
    }

    render() {
        var appFonts = [];
        for(let i=0; i<this.fonts.length; i++) {
            appFonts.push(<option value={this.fonts[i]} key={i}>{this.fonts[i]}</option>);
        }

        var textColor = [];
        for(let i=0; i<this.colors.length; i++) {
            textColor.push(<option value={this.colors[i].rgb} key={i}>{this.colors[i].name}</option>);
        }

        return(
            <div className="textContainer">
                <div className="closeText">
                    <button className="closeTextContainer" onClick={this.props.closeTextContainer}
                    title="Remove text">
                        <FaTrash />
                    </button>
                </div>
                <div> 
                    <div className="textContainerRow">
                        <label htmlFor="newText" className="imageText">Text to image:</label><br/>
                        <input className="newText" name="newText" id="newText"
                        onChange={this.props.addCanvasText}   
                        />
                    </div>
                    <div className="textContainerRow">
                        <div className="textContainerColumn">
                            <label htmlFor="newColor" className="imageText">Font color:</label><br/>
                            <select onChange={this.props.addCanvasTextColor}>
                                {textColor}
                            </select>
                        </div>
                        <div className="textContainerColumn">
                            <label htmlFor="textSize" className="imageText">Font size:</label><br/>
                            <input className="textSize" id="textSize" name="textSize" placeholder="16"
                            onChange={this.props.addCanvasTextSize}/> PX
                        </div>
                        <div className="">
                            <label htmlFor="textStyle" className="imageText">Font style:</label><br/>
                            <select onChange={this.props.addCanvasTextStyle}>
                                {appFonts}
                            </select>
                        </div>
                    </div>
                    <div className="textContainerRowUpDown">
                        <label className="imageText">Text position: </label><br/>
                        <button className="appBtn" onClick={this.props.addCanvasTextTop}>
                            Up <FaPlus/>
                        </button>
                        <button className="appBtn" onClick={this.props.addCanvasTextBottom}>
                            Down <FaMinus/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TextComponent;