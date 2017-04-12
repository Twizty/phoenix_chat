import React from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import { signInUser } from '../actions'

class SignIn extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (!isEmpty(nextProps.currentUser)) {
      return this.redirectToApp()
    }

    if (!isEmpty(nextProps.error)) {
      return this.displayError()
    }
  }

  redirectToApp() {
    this.props.router.push('/chat')
  }

  displayError() {
    console.log(this.props.error)
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.dispatch(signInUser({name: this.name.value, password: this.password.value}))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Name" className="form-control" ref={ el => this.name = el }/>
        <input type="password" placeholder="Password" className="form-control" ref={ el => this.password = el }/>
        <input type="submit" value="Sign In" className="btn btn-success" />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.app.currentUser.entity,
    error: state.app.currentUser.errors
  }
}

export default connect(mapStateToProps)(SignIn)
