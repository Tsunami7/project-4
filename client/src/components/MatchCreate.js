import React from 'react';
import { withRouter } from 'react-router-dom';

function MatchCreate(props) {
  
  return (
    <div className="create-form" >
      <h2>Create a new match</h2>
      <form onSubmit={props.newMatches}>   

        <p>Matches comment:</p>
        <input
        
          type="text"
          name="comment"
          value={props.matchForm.comment}
          onChange={props.handleFormChange} />
   
        <br />
        <button>Submit</button>
      </form>
    </div >
  )
}

export default withRouter(MatchCreate);

/* now to create match

1. check if we can create matches by hitting the end point


2. 

3. 
*/