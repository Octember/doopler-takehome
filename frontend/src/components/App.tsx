import React from 'react';
import Tabs from './Tabs';
import '../css/App.css';

export default function App() {
  return (
    <div id="page">
      <h1>
        <span className="project">server</span>
        <span className="arrow">{'>'}</span>
        prod
      </h1>
      <div id="main">
        <Tabs />
      </div>
    </div>
  );
}
