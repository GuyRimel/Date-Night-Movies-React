import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
// views //////////
import RegistrationView from "../registration-view/registration-view";
import LoginView from "../login-view/login-view";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import ProfileView from "../profile-view/profile-view";
import DirectorView from "../director-view/director-view";
import GenreView from "../genre-view/genre-view";
// styles //////////
import { Navbar, Nav, Container, Row, Col, Button } from "react-bootstrap";
import "./main-view.scss";

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null
    };
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
  
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({ user: localStorage.getItem("user") });
      this.getMovies(accessToken);
    }
  }

  // on successful login, set the state of 'user'
  // then store key/values for "token" and "user" in localStorage
  // then call getMovies func, passing the token
  onLoggedIn(authData) {
    this.setState({ user: authData.user.Username });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  // once the state becomes {user: null}, it'll render the login view
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({ user: null });
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Container fluid className="bright-bg w-100 p-0">
          <Navbar variant="dark" expand="lg">
              <Navbar.Brand href="#home">Date Night Movies!</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">Movies</Nav.Link>
                  <Nav.Link href="/users/:username">Profile</Nav.Link>
                  <Nav.Link href="/" onClick={() => { this.onLoggedOut() }} >Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
          </Navbar>
        </Container>

        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)}/>
                );
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
