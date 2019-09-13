import React from 'react';
import { withRouter } from 'react-router-dom';

function MatchEdit(props) {
  return (
    <div>
      <h3>Edit Match</h3>
      <form onSubmit={props.handleSubmit}>

        <p>Photo Link:</p>
        <input
          type="text"
          name="photo"
          value={props.userForm.photo}
          onChange={props.handleFormChange} />

        <p>Match Description:</p>
        <input
          type="text"
          name="description"
          value={props.matchForm.description}
          onChange={props.handleFormChange} />

        <button>Submit</button>
      </form>
    </div>
  )
}

export default withRouter(MatchEdit);