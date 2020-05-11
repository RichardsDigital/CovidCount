import React, { Component } from 'react';
import axios from 'axios';
import './styles/app.css';
import SidePanel from './components/SidePanel';

// Handle NHS API
// Pass props to sidepanel


// Articles (Springer Nature) API key: aac67b71e0aa832e6ea79a683ab75728

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {nhsData: null};

    this.fetchData('https://api.nhs.uk/conditions/coronavirus-covid-19?url=localhost:5000&modules=false');
  }

  fetchData(data) {
    axios.get(data)
    .then((res) => {this.setState( {nhsData: res.data.hasPart} )});
  }

  render() {

      return (
        <div className="App">
            <SidePanel nhsData = {this.state.nhsData}/>
        </div>
      )
  }
}

export default App;
