import React from "react"; 
import '../styles/panelbox.css';

function PanelBox(props) {
    return(
        <div className="panelBoxWrapper" style= {{ backgroundColor: props.color }}>
            <p>{props.title}</p>
        </div>
    )
}

export default PanelBox;