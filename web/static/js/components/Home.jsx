import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="welcome">Welcome!</div>
        <ul className="buttons">
          <li className="sign-in"><a href="/sign_in">Log in</a></li>
          <li className="register"><a href="/register">Sign up</a></li>
        </ul>
      </div>
    )
  }
}