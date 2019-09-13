import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router';

import decode from 'jwt-decode';

import Instructors from './components/Instructors'
import Instructor from './components/Instructor'
import InstructorCreate from './components/InstructorCreate'

import Login from './components/Login'
import Register from './components/Register'

import {
  createMatches,
  readAllMatches,
  updateMatches,
  destroyMatches,
  loginUser,
  registerUser,
  verifyUser
} from './services/api-helper'

import './App.css';

class App extends Component {
  state = {
    matches: [],
    matchForm: {
      link: "",
      photo: ""
    },
    currentUser: null,
    authFormData: {
      username: "",
      email: "",
      password: ""
    }
  }

  getMatches = async () => {
    const data = await readAllMatches()
    this.setState({
      matches: data.matches
    })
  }

  newMatch = async (e) => {
    e.preventDefault()
    const instructor = await createMatch(this.state.instructorForm)
    this.setState(prevState => ({
      instructors: [...prevState.instructors, instructor],
      instructorForm: {
        name: "",
        description: "",
        link: "",
        photo: ""
      }
    }))
  }

  editInstructor = async () => {
    const { instructorForm } = this.state
    await updateInstructor(instructorForm.id, instructorForm)
    this.setState(prevState => ({
      instructors: prevState.instructors.map(instructor => instructor.id === instructorForm.id ? instructorForm : instructor)
    }))
  }

  deleteInstructor = async (id) => {
    await destroyInstructor(id)
    this.setState(prevState => ({
      instructors: prevState.instructors.filter(instructor => instructor.id !== id)
    }))
  }

  handleFormChange = (e) => {
    const { name, value } = e.target
    this.setState(prevState => ({
      instructorForm: {
        ...prevState.instructorForm,
        [name]: value
      }
    }))
  }

  mountEditForm = async (id) => {
    const instructors = await readAllInstructors()
    const instructor = instructors.find(el => el.id === parseInt(id))
    this.setState({
      instructors,
      instructorForm: instructor
    })
  }

  // -------------- AUTH ------------------

  handleLoginButton = () => {
    this.props.history.push("/login")
  }

  handleLogin = async () => {
    const userData = await loginUser(this.state.authFormData);
    this.setState({
      currentUser: userData
    })
  }

  handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(this.state.authFormData);
    this.handleLogin();
  }

  handleLogout = async () => {
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null
    })
  }

  authHandleChange = async (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }

  async componentDidMount() {
    this.getInstructors()
    const user = await verifyUser();
    if (user) {
      this.setState({
        currentUser: user
      })
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1><Link to='/' onClick={() => this.setState({
            instructorForm: {
              name: "",
              description: "",
              link: "",
              photo: ""
            }
          })}>Course App</Link></h1>
          <div>
            {this.state.currentUser
              ?
              <>
                <p>{this.state.currentUser.username}</p>
                <button onClick={this.handleLogout}>Logout</button>
              </>
              :
              <button onClick={this.handleLoginButton}>Login / Register</button>
            }
          </div>
        </header>
        <Route exact path="/login" render={() => (
          <Login
            handleLogin={this.handleLogin}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route exact path="/register" render={() => (
          <Register
            handleRegister={this.handleRegister}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route
          exact path="/"
          render={() => (
            <Instructors
              instructors={this.state.instructors}
              instructorForm={this.state.instructorForm}
              handleFormChange={this.handleFormChange}
              newInstructor={this.newInstructor} />
          )}
        />
        <Route
          path="/new/instructor"
          render={() => (
            <InstructorCreate
              handleFormChange={this.handleFormChange}
              instructorForm={this.state.instructorForm}
              newInstructor={this.newInstructor} />
          )} />
        <Route
          path="/instructors/:id"
          render={(props) => {
            const { id } = props.match.params;
            const instructor = this.state.instructors.find(el => el.id === parseInt(id));
            return <Instructor
              id={id}
              instructor={instructor}
              handleFormChange={this.handleFormChange}
              mountEditForm={this.mountEditForm}
              editInstructor={this.editInstructor}
              instructorForm={this.state.instructorForm}
              deleteInstructor={this.deleteInstructor} />
          }}
        />
      </div>
    );
  }
}

export default withRouter(App);