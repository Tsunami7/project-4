import React from 'react';
import { withRouter } from 'react-router-dom';

function MatchEdit(props) {
  return (
    <div>
      <h3>Edit Match</h3>
      <form onSubmit={props.handleSubmit}>

        <p>Match Description:</p>
        <input
          className='match-description'
          type="text"
          name="post_comment"
          value={props.matchForm.post_comment}
          onChange={props.handleFormChange} />

        <button className='buttons'>Submit</button>
      </form>
    </div>
  )
}

export default withRouter(MatchEdit);

