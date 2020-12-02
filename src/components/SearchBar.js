import React from 'react';

class SearchBar extends React.Component {

	//initializing state
	state = { term: '' };

	//calling the onSubmit function passed as props from the App component which will fetch the movie data with the inputted term
	onSubmit = event => {
		event.preventDefault();
		this.props.onSubmit(this.state.term);
	}

	//setting term piece of state to equal the value of the input
	render() {
		return (
			<form onSubmit={this.onSubmit} className="ui form">
				<div className="field">
					<label>Enter Movie</label>
					<input 
						type="text"
						value={this.state.term}
						onChange={(e) => this.setState({term: e.target.value})}
					/>
				</div>
			</form>
		);
	};
}

export default SearchBar;


