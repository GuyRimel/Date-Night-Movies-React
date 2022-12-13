import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { filter } from "../../features/visibilityfilter-reducer";
import { MovieCard } from '../movie-card/movie-card';

function MoviesList() {
	const movies = useSelector((state) => state.movies.value);
	const visibilityFilter = useSelector((state) => state.visibilityFilter.value);
	const dispatch = useDispatch();

	const filteredMovies = movies.filter((m) =>
		m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
		);

  return (
		<Row>
			<Col md={12}>
				<Form.Control
					onChange={(e) => dispatch(filter(e.target.value))}
					value={visibilityFilter}
					placeholder="Search"
				/>
			</Col>
			{visibilityFilter !== ""
				? filteredMovies.map((m) => (
						<Col
							sm={12}
							md={6}
							lg={4}
							key={m._id}
						>
							<MovieCard movie={m} />
						</Col>
				  ))
				: movies.map((m) => (
						<Col
							sm={12}
							md={6}
							lg={4}
							key={m._id}
						>
							<MovieCard movie={m} />
						</Col>
				  ))}
		</Row>
	);
}

export default MoviesList;
