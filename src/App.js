import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import TextPage from "./pages/text";
import Pic from "./pages/pic";
import Media from "./pages/media";
import Files from "./pages/files";


class App extends Component {
  render() {
    return (
      <Router>
          <div>
              <Route path="/" render={() => <h2 style={{textAlign: 'center'}}>ipfs内容管理</h2>}/>
              <Route path="/text" component={TextPage}/>
              <Route path="/pic" component={Pic}/>
              <Route path="/media" component={Media}/>
              <Route path="/files" component={Files}/>
          </div>
      </Router>
    );
  }
}

export default App;
