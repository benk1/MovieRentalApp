import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/Like';
class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({
      movies,
    });
  };

  handleLike = (movie) => {
    console.log('Like clicked', movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({
      movies,
    });
  };
  render() {
    const { movies } = this.state;
    let message = movies.length ? (
      <div className='center '>
        <h5 className='red-text lighten-2'>
          We Have {movies.length} Movies in Our data Base
        </h5>
      </div>
    ) : (
      <div>
        <h1 className='red-text'>There are no Movies in the data base</h1>
      </div>
    );
    return (
      <>
        {message}
        <table className='responsive-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => {
              return (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className=' btn  red right'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default Movies;
