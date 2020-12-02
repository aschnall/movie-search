import React from 'react';
import './MovieCard.css';
import defaultPoster from '../assets/default-poster.jpg'
import { KEY } from '../apis/tmdb.js';


class MovieCard extends React.Component {
	
	//initializing state
	state = {stars: '', trailerKey: '', director: ''}

	//Making API calls to fetch director, cast, and trailer
	componentDidMount() {
		this.castSearch(this.props.id);
		this.videoSearch(this.props.id);
	}

	//fetching credit data with the give TMDB movie ID passed as props from the MovieList component
	//Pulling out the first 4 actors from the cast list and the director name from the fetched data
	castSearch = async id => {
		let credits = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${KEY}`);
		credits = await credits.json();
		let stars = credits.cast.slice(0,4);
		stars = stars.map(obj => obj.name).join(', ');
		let director = {};
		for (let i = 0; i < credits.crew.length; i++) {
			if (credits.crew[i].job==='Director' && credits.crew[i].department==='Directing') {
				director=credits.crew[i];
				break;
			}
		}
		this.setState({stars: stars, director: director.name})
	}

	//fetching trailer keys from the TMDB API with the give movie ID 
	videoSearch = async id => {
		let video = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}`);
		video = await video.json();
		if (video.results[0]) {
			this.setState({ trailerKey: video.results[0].key })
		}
	}

	//Not all movies in the database come with a list of cast, director, rating, etc. so using some 
	//conditional rendering to display those fields if they exist, otherwise display blank
	render() {
		return  (
			<div className="item">
				<div className="ui grid">
					<div className="ui row">
						<div id="poster" className="three wide column">
							<img 
								className="ui image"
								src={this.props.poster ? `http://image.tmdb.org/t/p/original/${this.props.poster}` : defaultPoster }
								alt={this.props.title}
							/>
						</div>
						<div className="thirteen wide column">
							<div className="content">
								<h2 className="header">{this.props.title} {this.props.year ?  `(${this.props.year})` : ''}</h2>
								<p className="description">{this.props.synopsis}</p>
								<p className="description">{this.state.stars ? `Starring: ${this.state.stars}` : ''}</p>
								<p className="description">{this.state.director ? `Directed by: ${this.state.director}` : ''}</p>
								<p className="description">{this.props.rating > 0 ? `User Score: ${this.props.rating*10}%` : ''}</p>
								{this.state.trailerKey ? <p className="description" style={{margin: '0'}}><strong>Trailer</strong></p> : ''}
								{this.state.trailerKey ? <iframe title="trailer" className="description" src={`https://www.youtube.com/embed/${this.state.trailerKey}`}/> : ''}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
}


export default MovieCard;




