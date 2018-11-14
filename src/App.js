import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <header>
              <Header name="Weather Checker" />
            </header>
            <Main />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
