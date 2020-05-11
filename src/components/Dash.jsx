import React, { Component } from "react";
import '../styles/dash.css';
import Dails from './dashItems/Dails';
import Graph from './dashItems/Graph';

class Dash extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.render();
    }

    render() {

        if (this.props.selectedPage === 'stats') {

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

        if (this.props.selectedPage === 'nhs' && this.props.nhsData) {

            return (
                <div className="dashBody">

                    <h1 className="pageHeader">NHS Advice</h1>

                    {
                        (this.props.nhsData).map((value, index) => {
                        return (
                            <div className="nhsInfoBox">
                                <p> <b>{value.description}</b></p>
                                <div className="borderArea">
                                    <div className="bullets"> 
                                        <span dangerouslySetInnerHTML={{ __html: value.text }} />  
                                    </div>    
                                </div>
                                    <a key={index} href={value.url} target="_blank">Learn More</a>                
                            </div>
                        )
                    })}
                </div>
            )
        }

    }
}

export default Dash;