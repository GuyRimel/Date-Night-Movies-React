import React                from "react";
import axios                from "axios";
import PropTypes            from "prop-types";
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView }        from "../login-view/login-view";
import { MovieCard }        from "../movie-card/movie-card";
import { MovieView }        from "../movie-view/movie-view";

import { Container, Row, Col } from "react-bootstrap";
import './main-view.scss';

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
    axios.get("https://datenightmovies.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // when a movie is clicked, this function is invoked and updates the state
  // of the 'selectedMovie' property to that movie
  setSelectedMovie(movie) {
    this.setState({selectedMovie: movie});
  }

  // when a user successfully logs in, this function updates the 'user'
  // property in state to that particular user
  onLoggedIn(user) {
    this.setState({user});
  }

  toggleRegister(registered) {
    this.setState({registered});
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    // if there is no user, the LoginView is rendered.  If there is a user
    // logged in, the user details are passed as a prop to the LoginView

    if (!registered) return (
      <RegistrationView
        onLoggedIn={(user) => this.onLoggedIn(user)}
        toggleRegister={(registered) => this.toggleRegister(registered)}
      />
    );
    
    if (!user) return (
      <LoginView
        onLoggedIn={(user) => this.onLoggedIn(user)}
        toggleRegister={(registered) => this.toggleRegister(registered)}
      />
    );

    // before the movies have been loaded
    if (movies.length === 0) return (
      <div className="main-view">Loading...</div>
    );

    return (
      <Container className="main-view">
        {selectedMovie
          ? (
            <Row className="justify-content-center">
              <Col md={8}>
                <MovieView
                  movie={selectedMovie}
                  onBackClick={newSelectedMovie => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            </Row>
          ) : (
            <Row className="justify-content-center">
              {movies.map(movie => (
                <Col md={3}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={newSelectedMovie => {
                      this.setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              ))}
            </Row>
          )
        }
      </Container>
    );
  } // end of render()
}
