import React from 'react';
import { withRouter } from 'react-router';


class Matches extends React.Component {
  componentDidMount = () => {
    // const match = this.props.mountEditForm(localStorage.getItem('userId'));

  }
  render() {
    // console.log(this.props.matches)
    return (
      <div className="matches-container">
        {this.props.matches.map(match => (
          <div
            key={match.id}
            className="match-card"
            onClick={() => {
              this.props.history.push(`/matches/${match.id}`)
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