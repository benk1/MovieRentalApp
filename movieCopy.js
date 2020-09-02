import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

import Pagination from './common/Pagination';
import { paginate } from '../utils/Paginate';
import ListGroup from './common/ListGroup';
import { getGenres } from '../services/fakeGenreService';
import MovieTable from './MovieTable';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Search from './SearchBox';
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    searchQuery: '',
    selectedGenre: null,
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
      searchQuery: '',
      currentPage: 1,
    });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({
      sortColumn,
    });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
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
        <h5 className='black-text left-align text-darken-5'>
          We have {filtered.length} movies in our database.
        </h5>
      </div>
    ) : (
      <div>
        <h1 className='black-text text-darken-5'>
          There are no Movies in the data base
        </h1>
      </div>
    );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
      const { totalCount, data: movies } = this.getPagedData();
    return (
      <div>
        <div className='row wrapper '>
          <div className='col s4 m3  pull-s2  list-group  '>
            <Link
              to='/movies/new'
              className=' btn-large #26a69a darken-1 '
              style={{ marginBottom: 28 }}
            >
              Add New Movie
            </Link>
            <ListGroup
              items={genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className='col s8  m9 push-s10 '>
            <Search
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            />
            {message}
            <MovieTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
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

