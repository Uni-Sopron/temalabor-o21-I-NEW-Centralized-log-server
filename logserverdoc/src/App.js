import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";

import Home from './pages/Home'
import Balint from './pages/Balint'
import Abel from './pages/Abel'
import Mate from './pages/Mate'
function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route exact path="/" element={ <Home/> }/>
        <Route exact path="/mate" element={ <Mate/> }/>
        <Route exact path="/abel" element={ <Abel/> }/>
        <Route exact path="/balint" element={ <Balint/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;