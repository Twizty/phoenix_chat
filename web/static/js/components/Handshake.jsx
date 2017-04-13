import React from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import { clearUserErrors } from '../actions'

class Handshake extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.currentUser)) {
      return this.redirectToApp()
    }

    if (nextProps.error) {
      this.props.dispatch(clearUserErrors())
      return this.redirectToLoginPage()
    }
  }

  redirectToApp() {
    this.props.router.push('/chat')
  }

  redirectToLoginPage() {
    this.props.router.push('/home')
  }

  render() {
    return (
      <div id="preloader-wrapper">
        <ul id="preloader-ul">
          <li className='preloader-li one'/>
          <li className='preloader-li two'/>
          <li className='preloader-li three'/>
          <li className='preloader-li four'/>
          <li className='preloader-li five'/>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.app.currentUser.entity,
    error: state.app.currentUser.handshakeError
  }
}

export default connect(mapStateToProps)(Handshake)
