import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Introduction from './pages/Introduction'
import Dev from './pages/Dev'
import Problem from './pages/Problem'
import Summary from './pages/Summary'
import Tech from './pages/Tech'
import Timeline from './pages/Timeline'
import Usermanual from './pages/Usermanual'
import './App.css';

function App() {

  return (
 <div className="App">
    <Navigation />
    <Routes>
      <Route exact path="/" element={ <Introduction/> }/>
      <Route path="/problem" element={ <Problem/> }/>
      <Route path="/tech" element={ <Tech/> }/>
      <Route path="/usermanual" element={ <Usermanual/> }/>
      <Route path="/dev" element={ <Dev/> }/>
      <Route path="/timeline" element={ <Timeline/> }/>
      <Route path="/summary" element={ <Summary/> }/>
    </Routes>
  </div>
    
   
  );
}

export default App;