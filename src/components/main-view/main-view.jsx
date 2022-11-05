import React                              from "react";
import axios                              from "axios";
import PropTypes                          from "prop-types";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { RegistrationView }               from "../registration-view/registration-view";
import { LoginView }                      from "../login-view/login-view";
import { MovieCard }                      from "../movie-card/movie-card";
import { MovieView }                      from "../movie-view/movie-view";
import { Container, Row, Col, Button }    from "react-bootstrap";
import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: true,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // when a movie is clicked, this function is invoked and updates the state
  // of the 'selectedMovie' property to that movie
  setSelectedMovie(movie) {
    this.setState({ selectedMovie: movie });
  }

  // when a user successfully logs in, this function updates the 'user'
  // property in state to that particular user
  onLoggedIn(authData) {
    console.log(authData)
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({ user: null });
  }

  toggleRegister(registered) {
    this.setState({ registered });
  }

  getMovies(token) {
    axios.get('https://datenightmovies.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      // assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(err => {
      console.log(err)
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    // if there is no user, the LoginView is rendered.  If there is a user
    // logged in, the user details are passed as a prop to the LoginView

    if (!registered)
      return (
        <RegistrationView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          toggleRegister={(registered) => this.toggleRegister(registered)}
        />
      );

    if (!user)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          toggleRegister={(registered) => this.toggleRegister(registered)}
        />
      );

    // before the movies have been loaded
    if (movies.length === 0) return <div className="main-view">Loading...</div>;

    return (
      <div className="main-view">
        <Row className='justify-content-center'>
          <Col className='text-light text-center p-0'>
            <h2>All Movies</h2>
            <Button
              onClick={() => this.onLoggedOut()}
            >
              Log Out
            </Button>
          </Col>
        </Row>
        {selectedMovie ? (
            <Row className="justify-content-center">
              <Col md={8}>
                <MovieView
                  movie={selectedMovie}
                  onBackClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            </Row>
        ) : (
          <Row className="justify-content-center">
            {movies.map((movie) => (
              <Col lg={3} md={4} sm={6} className='m-0 p-1'>
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    );
  } // end of render()
}
