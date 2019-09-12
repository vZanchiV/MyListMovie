import React , {Component} from 'react';
import { graphql, compose } from "react-apollo";
import likeReviewMutation from '../queries/likeReview'
 class ReviewList extends Component {
    render() {
        return (   
          <div className="collection">
                { this.renderReviewList()}
          </div>
        );
      }
      renderReviewList(){
        return this.props.reviews.map((review) => {
            return <li className="collection-item" key={review.id}>
               {review.content}   
               <div className="secondary-content delete-button">
                    <i onClick={() => this.addLikeReview(review.id,review.likes)}
                        className="material-icons ">
                            thumb_up
                    </i> 
                    {review.likes}   
                </div>
                   
            </li>;
        })
      }
      addLikeReview(id,oldLikes) {
        this.props.likeReviewMutation({
            variables:{id},
            optimisticResponse: {
                __typename:'Mutation',
                likeReview : {
                    id : id,
                    __typename : 'ReviewType',
                    likes: oldLikes + 1
                }

            }
        }).then( () => { // Important refrsh cach appolo
            this.props.readMovieQuery.refetch();
        })
      }
    } 


export default compose(
    graphql(likeReviewMutation, {
        name:'likeReviewMutation'
    })
    )(ReviewList);
