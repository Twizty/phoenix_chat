import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import { registerUser, clearUserErrors } from '../actions'

export class Register extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  }

  state = {
    isSubmitDisabled: true
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.errors)) {
      this.displayErrors(nextProps.errors.errors)
    }
  }

  displayErrors(errors) {
    alert(Object.keys(errors).map(k => [k, errors[k]].join(' ')).join(', '))
    this.props.dispatch(clearUserErrors())
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

  handleFormChange = () => {
    this.setState({
      isSubmitDisabled: this.name.value.length < 1 || this.password.value.length < 1 || this.passwordConfirmation.value.length < 1
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} onChange={this.handleFormChange}>
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
          <input disabled={this.state.isSubmitDisabled} type="submit" value="Sign In" className="btn btn-success" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.app.currentUser.errors
  }
}

export default connect(mapStateToProps)(Register)