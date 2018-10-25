import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <header>
              <Header name="Weather Checker" />
            </header>
            <main className="app">
              <Main />
            </main>
            <footer>
              <Footer />
            </footer>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
