import React , {Component} from 'react';
import { graphql, compose } from "react-apollo";
import { Link } from "react-router";
import readMovies from '../queries/readMovies';
import deleteMovie from '../queries/deleteMovie';

 class MovieList extends Component {
    render() {
        return (
          <div>
            <h1>List des films</h1>
            <ul className="collection">
                {this.renderMovie()}
            </ul>
            <Link to="/movies/create" className="btn-floating btn-large waves-effect waves-light blue right"><i className="material-icons">add</i></Link>
          </div>
        );
      }
      renderMovie() {
          if(!this.props.readMoviesQuery.loading) {
            return this.props.readMoviesQuery.movies.map((movie) => {
                return (<li className="collection-item" key={movie.id}>
                <Link to={`/movie/${movie.id}`}> {movie.title}</Link>
                <i onClick={() => this.onDeleteMovie(movie.id)} className="material-icons secondary-content delete-button">delete</i>
                </li>);
            })
          } else {
            return 'chargement des données'
          }
      }
      onDeleteMovie(id) {
        this.props.deleteMovieMutation({
            variables:{
                id
            }
        }).then( () => { // Important refrsh cach appolo
            this.props.readMoviesQuery.refetch();
        })
      }
}

export default compose(
    graphql(readMovies, {
        name:'readMoviesQuery'
    }),
    graphql(deleteMovie, {
        name:'deleteMovieMutation'
    })
)(MovieList);
