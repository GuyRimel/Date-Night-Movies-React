import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import VisibilityInputFilter from '../visibility-filter-input/visibility-filter-input';
import MovieCard from '../movie-card/movie-card';
import { Col, Row } from 'react-bootstrap';

const MovieList = ({visibilityFilter, movies, user}) => {

    let filteredMovies = movies;
    let userFavList = user.FavoriteMovies;

    if( visibilityFilter !== ''){
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if(!movies)
        return <div className="main-view" />;

    //handle fav movie btn clicked
    const addMovieToUserList = (movieId) =>{
        console.log(movieId);
        const token = localStorage.getItem('token');

        axios.post(`https://datenightmovies.herokuapp.com/movies/users/${user.Username}/movies/${movieId}`,{},{
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => {
            const updatedUser = response.data;
            console.log("Movie added to fav list");
            localStorage.setItem('user', JSON.stringify(updatedUser));
            window.location.reload();
        })
        .catch((error) => {
            console.log('Adding a movie to user list failed.', error);
        })
    }

    return (
      <Row className="px-2 px-md-5">
        <VisibilityInputFilter visibilityFilter={visibilityFilter} />
        {filteredMovies.map((m) => (
          <Col md={3} key={m._id} className=" mt-3 g-4">
            <MovieCard
              movie={m}
              liked={userFavList.includes(m._id)}
              addFavMovie={(movieId) => addMovieToUserList(movieId)}
            />
          </Col>
        ))}
      </Row>
    );
}

const mapStateToProps = ({visibilityFilter, movies}, ownProps) =>({
    visibilityFilter,
    movies,
    user: ownProps.user
});

export default connect(mapStateToProps)(MovieList);