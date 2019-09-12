import gql from "graphql-tag";
export default gql`
query ReadMovie($id : ID!)  {
        movie(id: $id) {
            id,
            title,
            reviews {
                content,
                id,
                likes
            }
        }    
    }
`;


