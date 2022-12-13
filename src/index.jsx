import React from "react";
import { createRoot } from "react-dom/client";
import Container from "react-bootstrap/Container";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./features/user-reducer";
import moviesReducer from "./features/movies-reducer";
import visibilityfilterReducer from "./features/visibilityfilter-reducer";
import MainView from "./components/main-view/main-view";
// this import tells Parcel to bundle `./index.scss`
import "./index.scss";

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    visibilityFilter: visibilityfilterReducer,
  },
});

// DNMApp component is where all other components are rendered into
class DNMApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

// finds the root of your app (from index.html)
const container = document.getElementsByClassName("app-container")[0];

// tell React to render your app in the root DOM element
const root = createRoot(container);
root.render(<DNMApp />);
