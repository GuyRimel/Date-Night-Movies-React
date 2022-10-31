import React          from 'react';
import ReactDOM       from 'react-dom';
import Container      from 'react-bootstrap/Container';
import { createRoot } from 'react-dom/client';
import { MainView }   from './components/main-view/main-view';
import './index.scss';

// main React component
class DNMApplication extends React.Component {
  render() {
    return (
      <Container fluid>
        <h1>Date Night Movies!</h1>
        <MainView />
      </Container>
    );
  }
}

// 'container' is the root DOM element
const container = document.getElementsByClassName('app-container')[0];
const root = createRoot(container);

// this tells React to render the app in the root DOM element
// ReactDOM.render(React.createElement(DNMApplication), container);
root.render(React.createElement(DNMApplication));