// src/App.js
import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import TeachableMachine from './components/TeachableMachine';

function App() {
    return (
        <Router>
            <div className="App">
            <header className="App-header">
             <h1>My App</h1>
             </header>
             <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/teachable-machine" element={<TeachableMachine />} />
        </Routes>
      </div>
    </Router>
    );
}

export default App;