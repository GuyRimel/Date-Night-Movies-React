import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({ user: localStorage.getItem("user") });
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
    this.setState({ user: authData.user.Username });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({ user: null });
  }

  toggleRegister(registered) {
    this.setState({ registered });
  }

  getMovies(token) {
    axios
      .get("https://datenightmovies.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { movies, user, registered } = this.state;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)}/>
                );
              if(registered === false)
                return (
                  <RegistrationView onRegistered={() => toggleRegister()}/>
                )
              if (movies.length === 0)
                return(
                  <div className="main-view"/>
                );
              return movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />
          <Route
            path="/movies/:movieId"
            render={({ match }) => {
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  } // end of render()
}
