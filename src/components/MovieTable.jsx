import React, { Component } from 'react';
import auth from '../services/authService'
import { Link } from 'react-router-dom';
import Like from './common/Like';
import Edit from './common/EditIcon'
//import TableHeader from './common/TableHeader';
//import TableBody from './common/TableBody';
import Table from './common/Table';
class MovieTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
   
    
    
  ];

 

  deleteColumn = {
    key: 'delete',
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className=' btn  red right'
      >
        Delete
      </button>
    ),
  }

  constructor(){
    super()
    const user = auth.getCurrentUser()
    if(user && user.isAdmin)
    //this.columns.push(this.editColumn)
    this.columns.push(this.deleteColumn)
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MovieTable;
