import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatCanvas from './pages/ChatCanvas'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatCanvas />} />
      </Routes>
    </Router>
  );
}

export default App;
