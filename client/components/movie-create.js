import React , {Component} from 'react';
import { graphql, compose } from "react-apollo";
import createMovieMuation from '../queries/createMovie';
import readMovieQuery from '../queries/readMovies';
import createReviewMutation from '../queries/createReview';
import {hashHistory} from 'react-router'


 class MovieCreate extends Component {
     constructor(props){
         super(props);
         this.state = {terms : "", errors :[] }
     }
    render() {
        return (
          <div>
              <h1>Ajouter un film</h1>
              <form className="input-field col s6">
                  <input
                    type="text"
                    className="validate"   
                    onKeyPress= {this.handleSubmiteForm.bind(this)}
                    onChange={e => this.setState({terms : e.target.value})}              
                  />
                  <label className="active">Titre</label>
              </form>
              <div className="row errors">
                {this.renderErrors()}      
            </div> 
          </div>
        );
      }

    

      handleSubmiteForm(e) {
        if(e.key ==='Enter' ){
            e.preventDefault();
            this.props.createMovieMuation({
                variables: {
                    title:this.state.terms
                },
                refetchQueries: [{
                    query: readMovieQuery
                }]
            }).then( () => {
                hashHistory.push('/movies')
            }).catch( (errors) => {
              const errorsMessages = errors.graphQLErrors.map(err => err.message)
                this.setState({errors:errorsMessages});
            })
        }

       
      }

      renderErrors() {
        return this.state.errors.map(m => m);    
     }
}

export default compose(
    graphql(createMovieMuation, {
        name:'createMovieMuation'
    }),
    graphql(createReviewMutation, {
        name:'createReviewMutation'
    }) 
)(MovieCreate);

