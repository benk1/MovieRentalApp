import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

import Pagination from './common/Pagination';
import { paginate } from '../utils/Paginate';
import ListGroup from './common/ListGroup';
import { getGenres } from '../services/fakeGenreService';
import MovieTable from './MovieTable';
import _ from 'lodash';
import NavBar from './NavBar';
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' },
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

  handleSort = (sortColumn) => {
    this.setState({
      sortColumn,
    });
  };
  render() {
    const {
      movies: moviesPaginated,
      pageSize,
      currentPage,
      selectedGenre,
      genres,
      sortColumn,
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? moviesPaginated.filter((m) => m.genre._id === selectedGenre._id)
        : moviesPaginated;
    let message = moviesPaginated.length ? (
      <div className='center '>
        <h5 className='red-text text-lighten-1'>
          We Have {filtered.length} Movies in Our data Base
        </h5>
      </div>
    ) : (
      <div>
        <h1 className='red-text text-lighten-3'>
          There are no Movies in the data base
        </h1>
      </div>
    );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return (
      <div className='container'>
        {message}
        <div className='row'>
          <div className='col s5 pull-l1 list-group  '>
            <span className='flow-text '>
              <ListGroup
                items={genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
              />
            </span>
          </div>
          <div className='col s6  push-l1  '>
            <span className='flow-text'>
              <MovieTable
                movies={movies}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
            </span>
          </div>
        </div>
            <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
      </div>
    );
  }
}

export default Movies;
