import React from 'react';
import { withRouter } from 'react-router-dom';

function MatchEdit(props) {
  return (
    <div>
      <h3>Edit Match</h3>
      <form onSubmit={props.handleSubmit}>

        <p>Match Description:</p>
        <input
          type="text"
          name="comment"
          value={props.matchForm.comment}
          onChange={props.handleFormChange} />

        <button>Submit</button>
      </form>
    </div>
  )
}

export default withRouter(MatchEdit);


/*
- now let allow the user to edit their post
To Do So:
// need to check the end point so it got hit in postman
- matchedit is link to match
- 

*/