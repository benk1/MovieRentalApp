import React, { Component } from 'react';
import MoviesTable from './MovieTable';
import {toast} from 'react-toastify'
import ListGroup from './common/ListGroup';
import Pagination from './common/Pagination';
import { getMovies,deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genresService';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Search from './SearchBox';
import _ from 'lodash';
import { paginate } from '../utils/Paginate';

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

  async componentDidMount() {
    const {data} = await getGenres()
    const genres = [{ _id: '', name: 'All Genres' }, ...data];
    
    const {data: movies} = await getMovies()
    this.setState({ movies, genres });
  }

  handleDelete = async(movie) => {
    const originalMovies = this.state.movies
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id)
    } catch (ex) {
      if(ex.response && ex.response.status === 404)
      toast.error('This movie has already been deleted!')

      this.setState({movies: originalMovies})
    }

  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
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
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;
    const {user} = this.props

    if (count === 0)
      return (
        <p className='black-text text-darken-5'>
          There are no movies in the database.
        </p>
      );

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div>
        <div className='row wrapper'>
          <div className='col s4 m3  pull-s2  list-group'>
            {user && 
            <Link
              to='/movies/new'
              className=' btn-large #26a69a darken-1 '
              style={{ marginBottom: 28 }}
            >
              Add New Movie
            </Link>}
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className='col s8  m9 push-s10 movie'>
            <Search
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            />
            <p className='black-text text-darken-5'>
              Showing {totalCount} movies in the database.
            </p>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
