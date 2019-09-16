import React, { Component } from 'react';
import MatchesEdit from './MatchesEdit'
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    }
  }

  componentDidMount() {
    this.props.mountEditForm(this.props.id);
  }

  render() {
    const { match } = this.props;
    return (
      <div className="match-page">
        {match === undefined ? <h2>Loading . . .</h2> : (
          <div>
            
            <p>{match.comments}</p>
            <hr/>
            {this.state.isEdit ?
              <Route path={'users/:id/matches/:id'} render={() => (
                <MatchesEdit
                  handleFormChange={this.props.handleFormChange}
                  handleSubmit={(e) => {
                    e.preventDefault();
                    this.props.editMatch();
                    this.setState({ isEdit: false })
                    this.props.history.push(`/matches/${this.props.matchForm.user_id}`)
                  }}
                  matchForm={this.props.matchForm} />
              )} />
              :
              <>
                <button onClick={() => {
                  this.setState({
                    isEdit: true
                  })
                  this.props.history.push(`/matches/${match.id}/edit`)
                }}>Edit</button>
                <button onClick={() => {
                  this.props.deleteMatch(match.id);
                  this.props.history.push('/')
                }}>Delete</button>
              </>
            }
          </div>)}
      </div>)
  }
}

export default withRouter(Match);