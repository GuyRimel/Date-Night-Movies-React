import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MovieCard from '../movie-card/movie-card';
import './profile-view.scss';

import { Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';



export default class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  // display current user info

  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://datenightmovies.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  // edit user info

  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://datenightmovies.herokuapp.com/users/${username}`,
      {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday
        });
        localStorage.setItem('user', this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert("Profile updated.");
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  // delete a movie from users' favorite movies 

  onRemoveFavorite() {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://datenightmovies.herokuapp.com/users/${username}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // delete a user

  onDeleteUser() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.delete(`https://datenightmovies.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
        alert('Profile has been deleted.');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }


  render() {
    const { onBackClick, movies, user } = this.props;
    const FavoriteMovies = movies.filter(m => {
      return this.state.FavoriteMovies.includes(m._id)
    });

    return (
      <Container className="profile-view">
        <Row>
          <Col>
            <span>Signed in as </span>
            <Link to={`/users/${user}`}>{this.state.Username}</Link>
            <Button
              variant="danger"
              onClick={() => { this.onLoggedOut() }}>
                Log off
            </Button>
          </Col>
        </Row>
        <Row>
          <Button
            variant="warning"
            onClick={() => { onBackClick() }}>
              Back
          </Button>
        </Row>
        <Row>
          <Col>
            <h4>USERNAME</h4>
            <p>{this.state.Username}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>EMAIL</h4>
            <p>{this.state.Email}</p>
          </Col>
        </Row>
          <Row>
            <Col>
              <h4>BIRTHDAY</h4>
              <p>{this.state.Birthday}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>EDIT PROFILE</h4>
              <Form onSubmit={(e) => this.editUser(e)}>
                <Form.Group>
                  Username
                  <Form.Control type='text' name="Username" placeholder="New Username" onChange={(e) => this.setUsername(e.target.value)} required />
                </Form.Group>
                <Form.Group>
                  Password
                  <Form.Control type='password' name="Password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} required />

                </Form.Group>
                <Form.Group>
                  Email Address
                  <Form.Control type='email' name="Email" placeholder="New Email" onChange={(e) => this.setEmail(e.target.value)} required />

                </Form.Group>
                <Form.Group>
                  Birthday
                  <Form.Control type='date' name="Birthday" onChange={(e) => this.setBirthday(e.target.value)} />

                </Form.Group>
                <Button variant="success" type="submit" >Update</Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Button
              variant="danger"
              onClick={() => this.onDeleteUser()}
            >
              Delete Profile
            </Button>
          </Row>
        <Row>
        <h2>Favorite Movies</h2>
        {FavoriteMovies.map((movie) => (
          <Row>
            <Col>
                <MovieCard movie={movie} key={movie._id}/>
                <Button
                  variant="danger"
                  onClick={() => { this.onRemoveFavorite(movie._id) }}
                >
                  Remove Favorite
                </Button>
            </Col>
          </Row>
        ))}
        </Row>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  })
};