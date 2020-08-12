import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

import Pagination from './common/Pagination';
import { paginate } from '../utils/Paginate';
import ListGroup from './common/ListGroup';
import { getGenres } from '../services/fakeGenreService';
import MovieTable from './MovieTable';
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres: genres,
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
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
    });
  };

  handleSort = (path) => {
    console.log(path);
  };
  render() {
    const {
      movies: moviesPaginated,
      pageSize,
      currentPage,
      selectedGenre,
      genres,
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? moviesPaginated.filter((m) => m.genre._id === selectedGenre._id)
        : moviesPaginated;
    let message = moviesPaginated.length ? (
      <div className='center '>
        <h5 className='red-text lighten-2'>
          We Have {filtered.length} Movies in Our data Base
        </h5>
      </div>
    ) : (
      <div>
        <h1 className='red-text'>There are no Movies in the data base</h1>
      </div>
    );

    const movies = paginate(filtered, currentPage, pageSize);
    return (
      <div className='row'>
        <div className='col s6 m2 l3 '>
          <ListGroup
            items={genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className='col s12 m3 l9'>
          {message}
          <MovieTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
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
