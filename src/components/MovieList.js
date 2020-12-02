import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({movies}) => {

	//Mapping through array of movie data to render several instances of the MovieCard component
	const movieList = movies.map((movie) => {
		return <MovieCard
						title={movie.title}
						poster={movie.poster_path}
						synopsis={movie.overview}
						year={movie.release_date ? movie.release_date.slice(0,4) : ''}
						key={movie.id}
						id={movie.id.toString()}
						rating={movie.vote_average}
					/>
	})

	return (
		<div 
			className="ui relaxed divided list"
			style={{margin: '20px 60px'}}>
			{movieList}
		</div>
	);
}

export default MovieList;
