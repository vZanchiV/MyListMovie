import React , {Component} from 'react';
import { graphql, compose } from "react-apollo";
import readMovie from '../queries/readMovie';
import movieCreate  from './review.create'
import ReviewCreate from './review.create';
import { Link } from "react-router";
import  ReviewList  from "./review-list"

class MovieDetail extends Component {
    render() {
        if(this.props.readMovieQuery.loading){
            return <div>loading</div>
        }
        return (
          <div>
            <h1>Details du film : {this.props.readMovieQuery.movie.title}</h1>
            <Link to="/movies">Retour à la list des films</Link>
            <ReviewList reviews={this.props.readMovieQuery.movie.reviews} />
            <ReviewCreate movieID={this.props.params.id}/>
          </div>
        );
      }
}

export default compose(
    graphql(readMovie, {
        name:'readMovieQuery',
        options : (props) => {
            return {
                variables : {
                    id: props.params.id
                }
            }
        }
    })
)(MovieDetail);

