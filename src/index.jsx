import React from "react";
import {createRoot} from "react-dom/client";
// import { createStore } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import moviesSlice from "./reducers/
import MainView from "./components/main-view/main-view";
import { devToolsEnhancer } from 'redux-devtools-extension';
import { Container, Row } from "react-bootstrap";
import "./index.scss";


// main React component
// create Redux store // "createStore" is deprecated...
const store = configureStore({
	reducer: {
		user: userReducer,
		movies: moviesReducer,
		visibilityFilter: visibilityfilterReducer
	}
	});

class DNMApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
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
root.render(<DNMApplication />);
