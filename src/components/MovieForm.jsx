import React from "react";
import Form from './common/Form';
import Joi from 'joi-browser';
import { getGenres } from '../services/genresService';
import { getMovie, saveMovie } from '../services/movieService';
class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number in Stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Daily Rental Rate'),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      console.log('id',movieId)
      if (movieId === "new") return;
      
      //const movie = getMovie(movieId);
      const { data:movie } = await getMovie(movieId);
      console.log('MOVIE',movie)
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
    
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }
  doSubmit = async() => {
    await saveMovie(this.state.data);

    this.props.history.push('/movies');
  };

  render() {
    //const { match, history } = this.props;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit} className='col s12'>
          {this.renderInput('title', '')}
          {this.renderSelect('genreId', '', this.state.genres)}
          {this.renderInput('numberInStock', '', 'number')}
          {this.renderInput('dailyRentalRate', '')}

          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;
