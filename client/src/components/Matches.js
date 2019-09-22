import React from 'react';
import { withRouter } from 'react-router';

import {
  // readAllMatches,
  readMatchedUsers
} from './../services/api-helper'



class Matches extends React.Component {
  state = {
    // matches: [],
    matched_users: [],
    // post_comment: ''
  }
  // getMatches = async () => {
  //   const matches = await readAllMatches();
  //   this.setState({
  //     matches: matches
  //   })
  // }

  getMatchedUsers = async () => {
    const users = await readMatchedUsers();
    const users_not_current = users.filter(user => user.id !== this.props.currentUser.user_id)
    this.setState({
      matched_users: users_not_current
    })
  }

  componentDidMount = () => {
    if (localStorage.getItem("authToken") !== null ){
      // this.getMatches()
      this.getMatchedUsers()
    } else {
    }
  }

  render() {
    return (
      <div className="matches-container">
        {/* {this.state.matches.map(match => (
          <div
            key={match.id}
            className="match-card"
            onClick={() => {
              this.props.history.push(`/matches/${match.id}`)

              window.scrollTo(0, 0);
            }}>
            <p>{match.post_comment}</p>
          </div>
        ))} */}
        <h2>Your Matches</h2>
        {this.state.matched_users.length === 0 ? <p>You don't have any matches yet, create one below</p>:<p></p>}
        {this.state.matched_users.map(match => (
          <div
            key={match.id}
            className="match-user-card"
            onClick={() => {
              this.props.history.push(`/user/${match.id}/matches`)

              window.scrollTo(0, 0);
            }}>
            <p>{match.username}</p>
          </div>
        ))}
        <div
          className="match-card"
          onClick={() => this.props.history.push(`/matches/new`)}>
          <img
            alt="Create a new match"
            src="https://image.flaticon.com/icons/png/512/14/14980.png"
            className="plus-sign" />
          <h3>Create a new match</h3>
        </div>
      </div>
    )
  }
}

export default withRouter(Matches)