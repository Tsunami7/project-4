import React from 'react';
import { withRouter } from 'react-router-dom';
import UserProfile from "./UserProfile"

class MatchCreate extends React.Component {
  constructor(props){
    super(props)
    this.state={
      userToMatch: 2,
      post_comment: "",
      value:''
    }
  }
  // state 
  // function

  render() {
    return (
      <div className="create-form" >

        <UserProfile user={this.props.randomUser} />
        {/* <h2>Create a new match</h2> */}
        <form onSubmit={this.props.newMatches}>
          {/* <p>{match.comments}</p> */}
          <p>Write Message</p>
          <input

            type="text"
            name="post_comment"
            value={this.props.matchForm.value}
            onChange={this.props.handleFormChange} />

          <br />
          {/* <p>{props.matchForm.userToMatch}</p> */}
          <button>Yes</button>
          <button>No</button>
        </form>

      </div >
    )
  }
}

export default withRouter(MatchCreate);
