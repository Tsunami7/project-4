import React, { Component } from 'react';
import MatchesEdit from './MatchesEdit'
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      // user_id: props.id,
      // value: []
    }
  }

  componentDidMount() {
    this.props.mountEditForm(this.props.id);
  }

  render(props) {
    // console.log("MATCH PROPS test", this.props)
    
    
    const { match, id } = this.props;
    return (
      <div className="match-page">
        {match === undefined ? <h2>Loading . . .</h2> : (
          <div>
            
            <p>{match.comments}</p>
            <hr/>
            {this.state.isEdit ?
              <Route path={'users/:user_id/matches/:match_id'}
                render={(props) => {
                  console.log('test match fuck you', props)
                  console.log('test two fuck you', props.params.id)
                  return <MatchesEdit
                    handleFormChange={this.props.handleFormChange}
                    handleSubmit={(e) => {
                      e.preventDefault();
                      this.props.editMatch();
                      this.setState({ isEdit: true })
                      // this.props.history.push(`/matches/${this.props.matchForm.user_id}`)
                      // this.props.history.push(`/matches/${user_id}/edit`)
                      console.log("match edit hit", match)
                      // params not passing through google it
                    }}

                    matchForm={this.props.matchForm} />
                }} />
              :
              <>
                <button onClick={() => {
                  this.setState({
                    isEdit: true
                  })
                  // this.props.history.push(`/matches/${match.id}/edit`)
                  this.props.history.push(`/matches/${match.id}/edit`)
                  console.log('match not working', match)
                  console.log('match not working', match.id)
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