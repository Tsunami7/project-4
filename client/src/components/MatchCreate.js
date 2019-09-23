import React from 'react';
import { withRouter } from 'react-router-dom';
import UserProfile from "./UserProfile"

class MatchCreate extends React.Component {
  constructor(props) {
    super(props)
    // this.state={
    //   userToMatch: 2,
    //   post_comment: "",
    //   value:''
    // }
  }
  // state 
  // function

  async componentDidMount() {
    const checkUser = localStorage.getItem("authToken");
    if (checkUser) {
      this.props.getRandomUser();
    }
  }


  render() {
    return (
      <div className="create-form" >

        <UserProfile user={this.props.randomUser} />
        {/* <h2>Create a new match</h2> */}
        <form onSubmit={this.props.newMatch}>
          {/* <p>{match.comments}</p> */}
          <h2 className='message-title'>Write a Message below: </h2>
          <input

            className='message-box'
            type="text"
            name="post_comment"
            value={this.props.matchForm.value}
            onChange={this.props.handleFormChange} />

          <br />
          {/* <p>{props.matchForm.userToMatch}</p> */}
          <button className='buttons'>Yes</button>
        </form>
        <button
          className='buttons'
          onClick={this.props.getRandomUser}
        >No</button>

      </div >
    )
  }
}

export default withRouter(MatchCreate);
