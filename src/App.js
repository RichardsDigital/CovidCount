import React from 'react';
import './styles/app.css';
import Navbar from './components/Navbar';
import SidePanel from './components/SidePanel';

function App() {
  return (
    <div className="App">
        <Navbar />
        <SidePanel />
    </div>
  );
}

export default App;
