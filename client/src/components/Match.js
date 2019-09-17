import React, { Component } from 'react';
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

  render(props) {

    const { match } = this.props;
    return (
      <div className="match-page">
        {match === undefined ? <h2>Loading . . .</h2> : (
          <div>

            <p>{match.comments}</p>
            <hr />
            <button onClick={() => {
              this.setState({
                isEdit: true
              })
              this.props.history.push(`/matches/${match.id}/edit`)
              // console.log('match not working', match)
              // console.log('match not working', match.id)
            }}>Edit</button>
            <button onClick={() => {
              this.props.deleteMatch(match.params.id);//delete issues working
              console.log(match)
              this.props.history.push('/')
            }}>Delete</button>
            
          </div>)}
      </div>)
  }
}


  export default withRouter(Match);