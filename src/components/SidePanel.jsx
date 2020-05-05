import React, { Component } from "react"; 
import PanelBox from './PanelBox';
import '../styles/sidepanel.css';

class SidePanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panelWrapper">
            <div className="logo">
                <h3>CovidCount</h3>
            </div>
                <PanelBox title='Country Statistics' color='rgb(255, 53, 53)'/>
                {/* <PanelBox title='NHS Advice' color=''/>
                <PanelBox title='New Findings' color=''/> */}
            </div>
        )
    }
}

export default SidePanel;