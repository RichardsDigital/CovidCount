import React, { Component } from "react";
import '../../styles/dails.css';

class Dails extends Component {

    render() {
        return (
            <div className="dailsWrapper">
                <div className="dailBox">
                    <h3>Confirmed</h3>
                    <div className="innerBox">
                        <p>{this.props.confirmed}</p>
                    </div>
                </div>
                <div className="dailBox">
                    <h3>Deaths</h3>
                    <div className="innerBox">
                        <p>{this.props.deaths}</p>
                    </div>
                </div>
                <div className="dailBox">
                    <h3>Recovered</h3>
                    <div className="innerBox">
                        <p>{this.props.recovered}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dails;