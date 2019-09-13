import React from 'react';
import { withRouter } from 'react-router-dom';

function InstructorCreate(props) {
  return (
    <div className="create-form" >
      <h2>Create a new match</h2>
      <form onSubmit={props.newInstructor}>

        <p>Instructor's name:</p>

        <input
          type="text"
          name="name"
          value={props.instructorForm.name}
          onChange={props.handleFormChange} />

        <p>Photo Link:</p>
        <input
          type="text"
          name="photo"
          value={props.instructorForm.photo}
          onChange={props.handleFormChange} />

        <p>Instructor's Description:</p>
        <input
          type="text"
          name="description"
          value={props.instructorForm.description}
          onChange={props.handleFormChange} />

        <p>Instructor's Link:</p>
        <input
          type="text"
          name="link"
          value={props.instructorForm.link}
          onChange={props.handleFormChange} />
        <br />
        <button>Submit</button>
      </form>
    </div >
  )
}

export default withRouter(InstructorCreate);