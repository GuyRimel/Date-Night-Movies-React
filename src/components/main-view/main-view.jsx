import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import RegistrationView from "../registration-view/registration-view";
import LoginView from "../login-view/login-view";
import MovieView from "../movie-view/movie-view";
import DirectorView from "../director-view/director-view";
import GenreView from "../genre-view/genre-view";
import NavBar from "../navbar/navbar";
import ProfileView from "../profile-view/profile-view";
import MovieList from "../movie-list/movie-list";
import { setMovies } from "../../actions/actions";

import { Row, Col } from "react-bootstrap";
import "./main-view.scss";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");

    if (accessToken !== null) {
      this.setState({
        user: JSON.parse(localStorage.getItem("user")),
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get("https://datenightmovies.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify(authData.user));
    this.getMovies(authData.token);
  }

  onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    let { movies } = this.props;
    const { user } = this.state;
    const isLoggedIn = !!user;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <NavBar user={user} />
          <Col className="mt-2">
            <Route
              exact
              path="/"
              render={(props) =>
                isLoggedIn ? (
                  <MovieList user={user} />
                ) : (
                  <Col className="login-background">
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                )
              }
            />
            {/* 2. Register endpoint */}
            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col className="login-background">
                    <RegistrationView />
                  </Col>
                );
              }}
            />
            {/* 3.Movie end point */}
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user) {
                  return (
                    <Col className="mt-2">
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }
                if (movies.length === 0)
                  return (
                    <div className="main-view">
                      No data available to display!!!!
                    </div>
                  );

                return (
                  <Row className="px-2 px-md-5">
                    <Col md={8} className="mx-auto">
                      <MovieView
                        movie={movies.find(
                          (m) => m._id === match.params.movieId
                        )}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  </Row>
                );
              }}
            />
            {/* 4. Director Route */}
            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                /* If there is no user, the LoginView is rendered. If there is a user logged in,
       the user details are passed as a prop to the LoginView */
                if (!user)
                  return (
                    <Col>
                      <LoginView
                        movies={movies}
                        onLoggedIn={(user) => this.onLoggedIn(user)}
                      />
                    </Col>
                  );
                // Before the movies have been loaded
                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <Row className="px-2 px-md-5">
                    <Col md={8} className="mx-auto">
                      <DirectorView
                        movies={movies.filter(
                          (m) => m.Director.Name === match.params.name
                        )}
                        director={
                          movies.find(
                            (m) => m.Director.Name === match.params.name
                          ).Director
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  </Row>
                );
              }}
            />
            {/* 5. Genre Route */}
            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user) {
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }
                if (movies.length === 0)
                  return (
                    <div className="main-view">
                      No data available to display!!!!
                    </div>
                  );

                return (
                  <Row className="px-2 px-md-5">
                    <Col md={8} className="mx-auto">
                      <GenreView
                        movies={movies.filter(
                          (m) => m.Genre.Name === match.params.name
                        )}
                        genre={
                          movies.find((m) => m.Genre.Name === match.params.name)
                            .Genre
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  </Row>
                );
              }}
            />
            {/* 6. MovieList Route */}
            <Route
              path="/movie"
              render={() => {
                if (!user) {
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }

                if (movies.length === 0)
                  return (
                    <div className="main-view">
                      No data available to display!!!!
                    </div>
                  );

                return (
                  <Col>
                    <MoviesList movies={movies} />;
                  </Col>
                );
              }}
            />
            {/* 6. Profile Route */}
            <Route
              path="/profile"
              render={() => {
                if (!user) {
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }

                if (movies.length === 0)
                  return (
                    <div className="main-view">
                      No data available to display!!!!
                    </div>
                  );

                return (
                  <Col>
                    <ProfileView user={user} movies={movies} />
                  </Col>
                );
              }}
            />
          </Col>
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

export default connect(mapStateToProps, { setMovies })(MainView);
