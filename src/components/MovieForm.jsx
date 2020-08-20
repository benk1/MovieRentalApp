import React, { Component } from 'react';
class MovieForm extends Component {
  state = {};
  render() {
    const { match, history } = this.props;
    return (
      <div>
        <h1>Movie Form {match.params.id}</h1>
        <button
          onClick={() => history.push('/movies')}
          className='waves-effect waves-light btn-large blue darken-2 '
        >
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
