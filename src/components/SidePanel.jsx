import React, { Component } from "react"; 
import Navbar from './Navbar';
import '../styles/sidepanel.css';
import '../styles/panelbox.css';

class SidePanel extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.state = {selectedPage: 'stats'};
    }

    handleClick(e) {
        this.setState({selectedPage: e});
    }

    render() {
        return (
            <div>
                <div className="panelWrapper">

                    <div className="logo">
                        <h3>CovidCount</h3>
                    </div>

                    <div onClick={() => this.handleClick('stats')} className="panelBoxWrapper" style= {{ backgroundColor: 'rgb(255, 53, 53)' }}>
                         <p>Country Statistics</p>
                    </div>

                    <div onClick={() => this.handleClick('nhs')} className="panelBoxWrapper" style= {{ backgroundColor: 'blue' }}>
                         <p>NHS Advice</p>
                    </div>

                </div>

                <Navbar selectedPage={this.state.selectedPage} nhsData={this.props.nhsData}/>
            </div>
        )
    }
}

export default SidePanel;