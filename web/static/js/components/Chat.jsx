import React from 'react';

export default class Chat extends React.Component {
  render() {
    return (
      <div>
        <div className="form-group">
          <div className="messages">

          </div>
          <div className="users">

          </div>
        </div>
        <div className="form-group">
          <textarea>
          </textarea>
        </div>
        <input type="submit" value="Sign In" className="btn btn-success" />
      </div>
    )
  }
}