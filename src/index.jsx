import React from "react";
import {createRoot} from "react-dom/client";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from "./reducers/reducers";
import MainView from "./components/main-view/main-view";
import { devToolsEnhancer } from 'redux-devtools-extension';
import { Container, Row } from "react-bootstrap";
import "./index.scss";


// main React component
// create Redux store // "createStore" is deprecated...
const store = createStore(moviesApp, devToolsEnhancer());

class DNMApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container fluid>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// 'container' is the root DOM element
const container = document.getElementsByClassName("app-container")[0];
const root = createRoot(container);

// this tells React to render the app in the root DOM element
// ReactDOM.render(React.createElement(DNMApplication), container);
root.render(React.createElement(DNMApplication));