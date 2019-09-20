import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import { withRouter } from 'react-router';

import decode from 'jwt-decode';

import Matches from './components/Matches'
import Match from './components/Match'
import MatchCreate from './components/MatchCreate'
import MatchesEdit from './components/MatchesEdit'

import Login from './components/Login'
import Register from './components/Register'

import {
  createMatches,
  readAllMatches,
  updateMatches,
  destroyMatches,
  loginUser,
  registerUser,
  randomUser
} from './services/api-helper'

import './App.css';

class App extends Component {

  state = {
    matches: [],
    matchForm: {
      userToMatch: 2,
      post_comment: ""
    },
    currentUser: null,
    authFormData: {
      username: "",
      email: "",
      password: "",
      image_link: "",
      social_url: ""
    },
    randomUser: {}
  }


  getRandomUser = async () => {
    let userRandom = await randomUser();
    this.setState({
      matchForm: {
        userToMatch: userRandom.id
      },
      randomUser: userRandom
    });
  }

  refreshCurrentUser = () => {
    let token = localStorage.getItem("authToken")
    this.setState({
      currentUser: decode(token)
    })
    // console.log(this.state.currentUser)
  }

  newMatch = async (e) => {
    e.preventDefault()
    this.refreshCurrentUser()
    let userdata = {
      user1_id: this.state.currentUser.user_id,
      user2_id: this.state.matchForm.userToMatch,
    };
    let formdata = { ...this.state.matchForm, ...userdata };
    const match = await createMatches(formdata);
    this.setState(prevState => ({
      matches: [...prevState.matches, match],
      matchForm: {
        comment: ""
      }
    }))
  }

  editMatch = async (match_id) => {
    this.refreshCurrentUser()
    const { matchForm, currentUser } = this.state
    try {
      const user_id = currentUser.user_id
      await updateMatches(user_id, match_id, matchForm)
      // console.log(user_id)
      console.log(match_id)
      // console.log(matchForm)

      this.setState(prevState => ({
        matches: prevState.matches.map(match => match.id === match_id ? matchForm : match)
      }))
    } catch (error) {
      // console.error("Probably not logged in", error)
    }
  }

  deleteMatch = async (id, user_id) => {
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
    const token = await loginUser(this.state.authFormData);

    localStorage.setItem("authToken", token)
    localStorage.setItem("jwt", token)
    this.setState({
      currentUser: decode(token)
    })
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
    localStorage.removeItem("authToken");
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
    const checkUser = localStorage.getItem("authToken");
    if (checkUser) {
      const user = decode(checkUser);
      this.getRandomUser();
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
                <Link to='/matches'> Home </Link>
                <p>{this.state.currentUser.username}</p>
                <button onClick={this.handleLogout}>Logout</button>
              </>
              :
              <button onClick={this.handleLoginButton}>Login / Register</button>
            }
            {/* <Link>Home</Link> */}
          </div>
        </header>

        <Route exact path="/login"
          render={() => (
            <Login
              handleLogin={this.handleLogin}
              handleChange={this.authHandleChange}
              formData={this.state.authFormData}
            />
          )}
        />

        <Route exact path="/register"
          render={() => (
            <Register
              handleRegister={this.handleRegister}
              handleChange={this.authHandleChange}
              formData={this.state.authFormData} />)} />

        <Route
          exact path="/matches"
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
        <Switch>
          <Route
            path="/matches/new"
            render={() => (
              <MatchCreate
                handleFormChange={this.handleFormChange}
                matchForm={this.state.matchForm}
                newMatches={this.newMatches}
                randomUser={this.state.randomUser} />
            )} />
          <Route path={'/matches/:match_id/edit/'}
            render={(props) => {
              const match_id = props.match.params.match_id

              return <MatchesEdit
                handleFormChange={this.handleFormChange}
                handleSubmit={(e) => {
                  e.preventDefault();
                  this.editMatch(match_id);
                }}

                matchForm={this.state.matchForm} />
            }} />

          <Route
            path="/matches/:id"
            render={(props) => {
              let id = props.match.params.id;
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
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);


/*
So user will make a match then user will be able to write a comment. Then post this comment and then should be able to edit this post and then delete this post.
*/

/*
things done:
- got a home link for user login
- fix value warning for updting message
- fix the routing issues when i used updateMatches from apihelper had to add params.id from id in match.js 

- to generate new table:
  rails g scaffold Comment 
*/

/*
things to do:
- create new table for comments
- make sure to console log everything
- attach this to apihelpers
- attach these on to front-end 
*/