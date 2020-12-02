import React from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import { KEY } from '../apis/tmdb';

class App extends React.Component {

	//Initializing movies and resultsExist pieces of state
	state = { movies: [], resultsExist: true };

	//Fetching data from TMDB API with inputted term
	//setting resultsExist piece of state to true or false depending on if results are received
	//Setting movies piece of state to the first 10 movies received
	onFormSubmit = async term => {
		let response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&api_key=${KEY}&language=en-US&page=1&include_adult=false`);
		response = await response.json();
		if (response.results.length === 0) {
			this.setState({resultsExist: false});
		} else {
			this.setState({resultsExist: true});
		}
		this.setState({movies: response.results.slice(0,10)})
	}

	render() {
		const { movies, resultsExist } = this.state;
		return (
			<div>
				<div className="ui container">
					<SearchBar onSubmit={this.onFormSubmit} />
				</div>
				{resultsExist ? 
					<MovieList movies={movies}/> :
					<div style={{margin: '20px 0', textAlign: 'center', fontSize: '24px'}}>No results found</div>
				}
			</div>

		);
	};
}

export default App;