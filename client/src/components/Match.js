import React, { Component } from 'react';
import { withRouter } from 'react-router';




class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      // matched_users: [],
      post_comment: ''
    }
  }

  filterMatches = (match) => {
    console.log("FILTER:", this.props.user_id, this.props.current_user.user_id)
    let is_relevant = false;
    is_relevant = is_relevant || ((match.user2_id == this.props.user_id) && (match.user1_id == this.props.current_user.user_id))
    is_relevant = is_relevant || ((match.user1_id == this.props.user_id) && (match.user2_id == this.props.current_user.user_id))
    return is_relevant
    // return true
  }

  async componentDidMount() {
    // get matches from 
    await this.props.getMatches(this.props.user_id)
    // filter by user id of user shown
    let filtered_matches = this.props.matches.filter(this.filterMatches);
    // console.log("Match.js props", this.props)
    console.log("props matches", this.props.matches)
    console.log("filtered_matches", filtered_matches)
    this.setState({
      matches: filtered_matches
    })
  }


  render(props) {

    const { matches } = this.state;
    return (
      <div className="match-page">
        {matches.length === 0 ? <h2>Loading . . .</h2> : (
          <div className='test'>
            {this.state.matches.map(match => (
              <div
                key={match.id}
                className="match-card">

                <div>
                <h3 className='message-from-user'><h2 className='username-left-msg'>{match.user1.username}</h2>left you a message</h3>
                <p className="the-message">{match.post_comment}</p>
                </div>

                <button
                  className='buttons'
                  onClick={() => {
                    this.setState({
                      isEdit: true
                    })
                    this.props.mountEditForm(match.id);
                    this.props.history.push(`/matches/${match.id}/edit`)
                  }}>Edit</button>
                <button 
                className='buttons'
                onClick={() => {
                  this.props.deleteMatch(match.id);
                  this.props.history.push('/matches')
                }}>Delete</button>

              </div>
            ))}

          </div>)}
      </div>)
  }
}

export default withRouter(Match);