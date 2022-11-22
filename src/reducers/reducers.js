import { combineReducers } from 'redux';
import { SET_FILTER, SET_MOVIES } from '../actions/actions';

// reducers receive a state and action, to modify the state(store) //////////
// reducers only touch what they're concerned with. they calc the next state and return it
function visibilityFilter(state = '', action) {
  switch(action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch(action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function moviesApp(state = '', action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    movies: movies(state.movies, action)
  }
}

export default moviesApp;