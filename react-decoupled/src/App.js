import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import ParticlesBg from "particles-bg";
import './App.css';
import Node from './components/Node';
import NodeList from './components/NodeList';
import NodeListTeaser from './components/NodeListTeaser';
import AppHeader from './components/AppHeader';
import AppMenu from './components/AppMenu';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <AppMenu />
      <div className="App-body">
        <div className="App-region-left">
          <NodeList />
          {/* <ParticlesBg color="#ff0000" num={2} type="polygon" bg={true}/> */}
        </div>
        <div className="App-content">
          <BrowserRouter>
            <Route exact path="/" component={props => <Node {...props} />}></Route>
            <Route path="/node-list" component={props => <NodeListTeaser {...props} />}></Route>
            <Route path="/node/:id" component={props => <Node {...props} />}></Route>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
