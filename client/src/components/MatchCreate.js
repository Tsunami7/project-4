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

/* now to create match

1. check if we can create matches by hitting the end point
create

on the form we need to show the user infomation
to get the user information we may have to go to the users show
then get the information back and show here
this should include the photo, and user name and social media info

we also need a no button, which calls the get random user function again to get a new user

2.
3.
*/