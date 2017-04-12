import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { registerUser } from '../actions'

export class Register extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: this.name.value,
      password: this.password.value,
      password_confirmation: this.passwordConfirmation.value
    }

    this.props.dispatch(registerUser({user: data}))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" placeholder="Name" className="form-control" ref={ el => this.name = el }/>
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" className="form-control" ref={ el => this.password = el }/>
          </div>
          <div className="form-group">
            <input type="password"
                   placeholder="Password Confirmation"
                   className="form-control"
                   ref={ el => this.passwordConfirmation = el } />
          </div>
          <input type="submit" value="Sign In" className="btn btn-success" />
        </form>
      </div>
    )
  }
}

export default connect()(Register)