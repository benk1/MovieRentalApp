import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/Like';
import Pagination from './common/Pagination';
import { paginate } from '../utils/Paginate';
import ListGroup from './common/ListGroup';
import { getGenres } from '../services/fakeGenreService';
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: getGenres(),
    });
  }

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

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
    //console.log(page);
  };

  handleGenreSelect = (genre) => {
    console.log(genre);
  };
  render() {
    const { movies, pageSize, currentPage, genres } = this.state;
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

    const moviesPaginated = paginate(movies, currentPage, pageSize);
    return (
      <div className='row'>
        <div className='col s6 m2 l3 '>
          <ListGroup
            items={genres}
            textProperty='name'
            valueProperty='_id'
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className='col s12 m3 l9'>
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
              {moviesPaginated.map((movie) => {
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
          <Pagination
            itemsCount={movies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
