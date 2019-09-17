import React from 'react';
import { withRouter } from 'react-router';

import {
  readAllMatches,
} from './../services/api-helper'



class Matches extends React.Component {
  state = {
    matches: [],
    post_comment: ''
  }
  getMatches = async () => {
    const matches = await readAllMatches();
    this.setState({
      matches: matches
    })
  }

  componentDidMount = () => {
    if (localStorage.getItem("authToken") !== null ){
      this.getMatches()
    } else {
    }
  }

  render() {
    return (
      <div className="matches-container">
        {this.state.matches.map(match => (
          <div
            key={match.id}
            className="match-card"
            onClick={() => {
              this.props.history.push(`/matches/${match.id}`)

              window.scrollTo(0, 0);
            }}>
            <p>{match.post_comment}</p>
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