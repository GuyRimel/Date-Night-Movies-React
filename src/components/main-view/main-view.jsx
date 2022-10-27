import React          from 'react';
import axios          from 'axios';

import { LoginView }  from '../login-view/login-view';
import { MovieCard }  from '../movie-card/movie-card';
import { MovieView }  from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    // 'super()' initializes this component's state
    // it binds the 'this' keyword to 'React.Component'
    super();

    // setting initial state
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  componentDidMount() {
    axios.get('https://datenightmovies.herokuapp.com/movies') // axios requesting hosted API
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onLoggedIn(user) {
    this.setState({user});
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    
    if(movies.length === 0) {
      return <div className="main-view">Loading...</div>;
    }

    return (
      // if there is a selectedMovie, show MovieView. Otherwise show all MovieCards
      <div className="main-view">
        {selectedMovie ? ( // true or false for the ternary
          <MovieView
            movie={selectedMovie}
            onBackClick={newSelectedMovie => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map(movie => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(movie) => {
              this.setSelectedMovie(movie);
            }}
          />
          ))
        )}
      </div>
    );
  } // end of 'render()' func
} // end of 'MainView' component
