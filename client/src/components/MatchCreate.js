import React from 'react';
import { withRouter } from 'react-router-dom';
import UserProfile from "./UserProfile"

function MatchCreate(props) {

  return (
    <div className="create-form" >

      <UserProfile user={props.randomUser} />
      {/* <h2>Create a new match</h2> */}
      <form onSubmit={props.newMatches}>
        {/* <p>{match.comments}</p> */}
        <p>Message</p>
        <input

          type="text"
          name="post_comment"
          value={props.matchForm.post_comment}
          onChange={props.handleFormChange} />

        <br />
        {/* <p>{props.matchForm.userToMatch}</p> */}
        <button>Yes</button>
        <button>No</button>
      </form>

    </div >
  )
}

export default withRouter(MatchCreate);
