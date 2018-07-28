import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Files from "./pages/files";
import Media from "./pages/media";
import Pic from "./pages/pic";
import Text from "./pages/text";
import {Layout,Menu,Icon} from 'antd'
const {Header,Sider,Content} = Layout


class App extends Component {

  render() {
    return (
      <Router>
          <div>
          <Route path='/' render={()=>{return <h2 style={{textAlign:'center'}}>ipfs文件管理系统</h2>}}></Route>
          <Route path='/text' component={Text}></Route>
          <Route path='/media' component={Media}></Route>
          <Route path='/pic' component={Pic}></Route>
          <Route path='/files' component={Files}></Route>
          </div>
      </Router>

    );
  }
}

export default App;
