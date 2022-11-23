import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// views/utility pieces //////////
import RegistrationView from "../registration-view/registration-view";
import LoginView from "../login-view/login-view";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import ProfileView from "../profile-view/profile-view";
import DirectorView from "../director-view/director-view";
import GenreView from "../genre-view/genre-view";
import { NavBar } from "../navbar/navbar";
import MoviesList from "../movies-list/movies-list";
// actions/reducers //////////
import { setMovies, setFilter } from "../../actions/actions";

// styles //////////
import { Navbar, Nav, Container, Row, Col, Button } from "react-bootstrap";
import "./main-view.scss";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      // movies: [],
      // favoriteMovies: [],
      // selectedMovie: null,
      user: null,
      // register: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  getMovies(token) {
    axios
      .get("https://datenightmovies.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // on successful login, set the state of 'user'
  // then store key/values for "token" and "user" in localStorage
  // then call getMovies func, passing the token
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

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

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onRegistration(register) {
    this.setState({
      register,
    });
  }

  handleFavorite = (movieId, action) => {
    const { user, favoriteMovies } = this.state;
    const accessToken = localStorage.getItem("token");
    const username = user;
    if (accessToken !== null && username !== null) {
      // Add MovieID to Favorites (local state & webserver)
      if (action === "add") {
        this.setState({ favoriteMovies: [...favoriteMovies, movieId] });
        axios
          .put(
            `https://datenightmovies.herokuapp.com/users/${username}/movies/${movieId}`,
            {},
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie added to ${username} Favorite movies`);
            alert(`Movie added to ${username} Favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });

        // Remove MovieID from Favorites (local state & webserver)
      } else if (action === "remove") {
        this.setState({
          favoriteMovies: favoriteMovies.filter((id) => id !== movieId),
        });
        axios
          .delete(
            `https://datenightmovies.herokuapp.com/users/${username}/favorites/${movieId}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie removed from ${username} Favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  render() {
    let { selectedMovie, user, favoriteMovies } = this.state;
    let { movies } = this.props;
    return (
      <Router>
        <NavBar user={user} />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView
                      md={4}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies} />;
            }}
          />

          <Route
            path="/register"
            render={() => {
              console.log("Registering User");
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView
                    onLoggedIn={(user) => this.onLoggedIn(user)}
                  />
                </Col>
              );
            }}
          />

          <Route
            path={`/users/:username`}
            render={({ history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <ProfileView
                    movies={movies}
                    goBack={history.goBack}
                    favoriteMovies={favoriteMovies || []}
                    handleFavorite={this.handleFavorite}
                  />
                </Col>
              );
            }}
          />

          <Route
            path={`/user-update/:username`}
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <UserUpdate
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              // console.log("movies route user", user);
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                    handleFavorite={this.handleFavorite}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/directors/:directorName"
            render={({ match, history }) => {
              console.log("movies route director", user);
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    movie={movies.find(
                      (m) => m.Director.Name === match.params.directorName
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/genres/:genreName"
            render={({ match, history }) => {
              console.log(
                movies.find((m) => m.Genre.Name === match.params.genreName)
              );
              console.log("movies route genre", user);
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    movie={movies.find(
                      (m) => m.Genre.Name === match.params.genreName
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/home"
            render={() => {
              console.log("Selecting Movie");
              if (user) return <Redirect to="/" />;
              return (
                <Row className="main-view justify-content-md-center">
                  {selectedMovie ? (
                    <Col md={8}>
                      <MovieView
                        movie={selectedMovie}
                        onBackClick={(newSelectedMovie) => {
                          this.setSelectedMovie(newSelectedMovie);
                        }}
                      />
                    </Col>
                  ) : (
                    movies.map((movie) => (
                      <Col md={4}>
                        <MovieCard
                          key={movie._id}
                          movie={movie}
                          onMovieClick={(newSelectedMovie) => {
                            this.setSelectedMovie(newSelectedMovie);
                          }}
                        />
                      </Col>
                    ))
                  )}
                </Row>
              );
            }}
          />
        </Row>
      </Router>
    );
  } // end of render()
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);