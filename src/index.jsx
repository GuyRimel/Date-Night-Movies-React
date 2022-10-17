import React from 'react';
import ReactDOM from 'react-dom';

// import indicating './index.scss' needs bundling
import './index.scss';

// main React component
class DNMApplication extends React.Component {
  render() {
    return (
      <div className="dnmovies">
        <div>Good Morning</div>
      </div>
    );
  }
}

// 'container' is the root DOM element
const container = document.getElementsByClassName('app-container')[0];

// this tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(DNMApplication), container);