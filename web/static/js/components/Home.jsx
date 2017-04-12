import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>&nbsp;</h1>
        <h2>Welcome!</h2>
        <ul>
          <li><a href="/sign_in">Log in</a></li>
          <li><a href="/register">Sign up</a></li>
        </ul>
      </div>
    )
  }
}