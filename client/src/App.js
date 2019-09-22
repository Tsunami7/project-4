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
    comment: [],
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
        post_comment: ""
      }
    }))
    this.getRandomUser(); 
  }

  editMatch = async (match_id) => {
    this.refreshCurrentUser()
    const { matchForm, currentUser } = this.state
    try {
      const user_id = currentUser.user_id
      await updateMatches(user_id, match_id, matchForm)

      this.setState(prevState => ({
        matches: prevState.matches.map(match => match.id === match_id ? matchForm : match)
      }))
    } catch (error) {
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

  handleLoginButton = () => {
    this.props.history.push("/login")
  }

  handleLogin = async () => {
    const token = await loginUser(this.state.authFormData);

    localStorage.setItem("authToken", token)
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
      await this.setState({
        currentUser: user
      })
    }
    console.log("user", this.state.currentUser)
  }

  getMatches = async (id) => {
    const matches = await readAllMatches(id);
    console.log('getMatches', matches)
    this.setState({
      matches: matches
    })
  }

  render() {
    const { id } = this.props.match.params
    return (
      <div className='app-container'>
        <header>
          <h1 className='main-title'><Link to='/' onClick={() => this.setState({
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
              currentUser={this.state.currentUser}
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
                newMatch={this.newMatch}
                randomUser={this.state.randomUser}
                getRandomUser={this.getRandomUser} />
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
            path="/user/:user_id/matches"
            render={(props) => {
              // let id = props.match.params.id;
              // const match = this.state.matches.find(el => el.id === parseInt(id));
              return <Match
                current_user={this.state.currentUser}
                user_id={props.match.params.user_id}
                matches={this.state.matches}
                handleFormChange={this.handleFormChange}
                mountEditForm={this.mountEditForm}
                editMatch={this.editMatch}
                matchForm={this.state.matchForm}
                deleteMatch={this.deleteMatch} 
                getMatches={this.getMatches}/>
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

