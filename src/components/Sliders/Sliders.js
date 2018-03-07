import React, { Component } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import "./Sliders.css";

export default class Sliders extends Component {
    // Method to handle user-input from sliders. Takes props from MovieList component to determine which values to change.
    onChange = range => {
        this.props.onChange({
          type: this.props.data.label,
          value: range
        });
    }

    render(){
        return(
            <div className="slider-container">
                <p style={{ textTransform:"capitalize", fontFamily: "Montserrat", fontSize:"14px" }}>{ this.props.data.label }</p>
                <InputRange
                    minValue={ this.props.data.min }
                    maxValue={ this.props.data.max }
                    value={ this.props.data.value }
                    onChange={ this.onChange }
                />
            </div>
        )
    }
}