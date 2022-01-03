import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route exact path="/" element={ <Introduction/> }/>
        <Route exact path="/problem" element={ <Problem/> }/>
        <Route exact path="/tech" element={ <Tech/> }/>
        <Route exact path="/usermanual" element={ <Usermanual/> }/>
        <Route exact path="/dev" element={ <Dev/> }/>
        <Route exact path="/timeline" element={ <Timeline/> }/>
        <Route exact path="/summary" element={ <Summary/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;