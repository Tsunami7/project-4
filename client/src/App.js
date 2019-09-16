import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router';

import decode from 'jwt-decode';

import Matches from './components/Matches'
import Match from './components/Match'
import MatchCreate from './components/MatchCreate'

import Login from './components/Login'
import Register from './components/Register'

import {
  createMatches,
  readAllMatches,
  updateMatches,
  destroyMatches,
  loginUser,
  registerUser
} from './services/api-helper'

import './App.css';

class App extends Component {
  state = {
    matches: [],
    matchForm: {
      comment: ""
    },
    currentUser: null,
    authFormData: {
      username: "",
      email: "",
      password: "",
      image_link: "",
      social_url: ""
    }
  }

  // getMatches = async () => {
  //   const matches = await readAllMatches()
  //   this.setState({
  //     matches
  //   })
  // }

  newMatch = async (e) => {
    e.preventDefault()
    const match = await createMatches(this.state.matchForm)
    this.setState(prevState => ({
      matches: [...prevState.matches, match],
      matchForm: {
        comment: " "
      }
    }))
  }

  editMatch = async () => {
    const { matchForm } = this.state
    await updateMatches(matchForm.id, matchForm)
    this.setState(prevState => ({
      matches: prevState.matches.map(match => match.id === matchForm.id ? matchForm : match)
    }))
  }

  deleteMatch = async (id) => {
    await destroyMatches(id)
    this.setState(prevState => ({
      matches: prevState.matches.filter(match => match.id !== id)
    }))
  }

  handleFormChange = (e) => {
    const { name, value } = e.target
    this.setState(prevState => ({
      matchForm: {
        ...prevState.matchForm,
        [name]: value
      }
    }))
  }

  mountEditForm = async (id) => {
    const matches = await readAllMatches()
    const match = matches.filter(el => el.id === parseInt(id))
    this.setState({
      matches: match,
      matchForm: match
    })
    return match
  }

  // -------------- AUTH ------------------

  handleLoginButton = () => {
    this.props.history.push("/login")
  }

  handleLogin = async () => {
    // const userData = await loginUser(this.state.authFormData);
    // console.log(userData);
    const token = await loginUser(this.state.authFormData);

    this.setState({
      currentUser: decode(token)
    })
    // console.log(userData)
    localStorage.setItem("jwt", token)
    // this.props.history.push(`/${localStorage.getItem('userId')}`);
    this.props.history.push(`/matches`);
  }

  handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(this.state.authFormData);
    this.handleLogin();
    this.props.history.push("/");
  }

  handleLogout = async () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("authToken"); // token is actually stored here
    this.setState({
      currentUser: null
    })
    this.props.history.push("/");
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
    const checkUser = localStorage.getItem("jwt");
    // this.getMatches()
    if (checkUser) {
      const user = decode(checkUser);
      this.setState({
        currentUser: user
      })
    }
  }

  render() {
    const { id } = this.props.match.params
    return (
      <div>
        <header>
          <h1><Link to='/' onClick={() => this.setState({
            matchForm: {
              comment: "",
            }
          })}>Get-Roaming</Link></h1>
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

        <Route exact path="/login" 
        render={() => (
          <Login
            handleLogin={this.handleLogin}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
            
        <Route exact path="/register" 
        render={() => (
          <Register
            handleRegister={this.handleRegister}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />

        <Route
          // exact path="/users/:id/matches/:id"
          exact path="/matches" // this should only shjow when someone is logged in
          render={() => (
            <Matches
              id={id}
              mountEditForm={this.mountEditForm}
              matches={this.state.matches}
              matchForm={this.state.matchForm}
              handleFormChange={this.handleFormChange}
              newMatches={this.newMatches} />
          )}
        />

        <Route
          path="/matches/new"
          render={() => (
            <MatchCreate
              handleFormChange={this.handleFormChange}
              matchForm={this.state.matchForm}
              newMatches={this.newMatches} />
          )} />

        <Route
          path="/matches/:id"
          render={(props) => {
            const match = this.state.matches.find(el => el.id === parseInt(id));
            return <Match
              id={id}
              match={match}
              handleFormChange={this.handleFormChange}
              mountEditForm={this.mountEditForm}
              editMatch={this.editMatch}
              matchForm={this.state.matchForm}
              deleteMatch={this.deleteMatch} />
          }}
        />
      </div>
    );
  }
}

export default withRouter(App);


/*

3. once log in show all matches comments for that user.
so issue was found in the backend where needed to pass use.id to display post comment.
it was in authentication controller where id: @user.id was added in local 
- this one needs to be updated to heroku
how do i get the current user's matches back end?
how do i get the current user in the back end matches controller?
4. how to console log out the end point for matches
*/

/*
Monday 
1. find where users comment are connecting
just check on postman the comment end point this one work so that means is the front end that is not liking it.
console.log how response is handling it that will be in your api-helper
ok got the api-helper to console.log res.data[0] 
also i hit the end point in postman and got http://localhost:3000/users/1/matches to pull the comment line 43 in api-helper
2. now issue is how come is 
3. 
*/