import React      from 'react';
import MovieCard  from '../movie-card/movie-card';

class MainView extends React.Component {
  
  constructor() {
    // 'super()' initializes this component's state
    // it binds the 'this' keyword to 'React.Component'
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: 'random movie title',
          Description: 'this is the description',
          ImagePath: 'here/there/everywhere.jpg'
        },
        {
          _id: 2,
          Title: 'randomer movie title',
          Description: 'this is the description',
          ImagePath: 'here/there/everywhere.jpg'
        }
      ]
    }
  }

  render() {
    const { movies } = this.state;

    if(movies.length === 0) {
      return <div className="main-view">Empty list! oh nooo!</div>;
    }

    return (
      <div className="main-view">
        {movies.map(movie => <MovieCard key={movie._id} movieData={movie}/>)}
      </div>
    );
  } // end of 'render()' func
} // end of 'MainView' class

export default MainView;
