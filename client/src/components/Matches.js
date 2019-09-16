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

  // to read all matches from api helper as readAllMatches()
  getMatches = async () => {
    const matches = await readAllMatches();
    this.setState({
      matches: matches
    })
  }

  componentDidMount = () => {
    // const match = this.props.mountEditForm(localStorage.getItem('userId'));
    // const token = localStorage.getItem('authToken')
    
    // how do we check if a user is logged in?
    if (localStorage.getItem("authToken") !== null ){
      this.getMatches()
    } else {
      console.log("USER NOT LOGGED IN YET")
    }
  }

  render() {
    console.log("MATCHES RENDER",this.props.matches)
    return (
      <div className="matches-container">
        {this.state.matches.map(match => (
          <div
            key={match.id}
            className="match-card"
            onClick={() => {
              // this.props.history.push(`/matches/${match.id}`)
              this.props.history.push(`/matches/${match.id}`)

              // WHAT AM I TRYING TO DO?
              // make the match show up for log in user with its own user id
              // 
              // props.history.push(`users/${id}/matches`)

              window.scrollTo(0, 0);
            }}>
            <p>{match.post_comment}</p>
            {/* <div className="image-cropper">
            <img alt={match.name} src={match.photo}/>
          </div>
          <h3>
            <p>{match.name}</p>
          </h3> */}
          </div>
        ))}
        <div
          className="match-card"
          // onClick={() => props.history.push('/new/match')}>
          onClick={() => this.props.history.push(`new/match`)}>
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