import React from 'react';
import Like from './common/Like';
const MovieTable = ({ movies, onDelete, onLike, onSort }) => {
  return (
    <table className='responsive-table'>
      <thead>
        <tr>
          <th onClick={() => onSort('title')}>Title</th>
          <th onClick={() => onSort('genre.name')}>Genre</th>
          <th onClick={() => onSort('numberInStock')}>Stock</th>
          <th onClick={() => onSort('dailyRentalRate')}>Rate</th>
          <th />
          <th />
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
                <Like liked={movie.liked} onClick={() => onLike(movie)} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
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
  );
};

export default MovieTable;
