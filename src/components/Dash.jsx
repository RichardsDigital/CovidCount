import React, { Component } from "react";
import '../styles/dash.css';
import Dails from './dashItems/Dails';
import Graph from './dashItems/Graph';

class Dash extends Component {

    constructor(props) {
        super(props);

        console.log(props)
    }

    render() {

        return (
            <div className="dashBody">

                <Dails 
                    confirmed = {this.props.confirmed}
                    deaths = {this.props.deaths} 
                    recovered = {this.props.recovered}
                />
                <Graph 
                    userSubmitted = {this.props.userSubmitted}
                    splitDays = {this.props.splitDays}
                    splitCases = {this.props.splitCases}
                />
            </div>
        )
    }
}

export default Dash;