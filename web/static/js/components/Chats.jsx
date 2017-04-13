import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { findIndex } from 'lodash'

import { fetchRooms, clearRooms } from '../actions'

class Chats extends React.Component {
  handleChange = () => {
    const searchVal = this.searchField.value
    if (searchVal.length > 0)
      this.props.dispatch(fetchRooms(searchVal))
    else
      this.props.dispatch(clearRooms())
  }

  renderRooms() {
    if (this.props.availableRooms.length === 0) return

    return (
      <ul className="available-rooms">
        {this.props.availableRooms.map(r => {
          return <li key={r.name}><Link to={`/chat/${r.name}`}>{r.name}</Link></li>
        })}
      </ul>
    )
  }

  renderCreateRoomLink() {
    const searchField = this.searchField
    if (!searchField) return

    const searchVal = searchField.value
    if (searchVal.length === 0) return

    if (findIndex(this.props.availableRooms, r => r.name === searchVal) !== -1) return

    return (
      <div>
        + <a href={`/chat/${searchVal}`}>{searchVal}</a>
      </div>
    )
  }

  render() {
    return (
      <div className="rooms-wrapper">
        <input
          className="form-control"
          ref={ el => this.searchField = el }
          onChange={this.handleChange}
          placeholder="Type name of room"
        />
        {this.renderRooms()}
        {this.renderCreateRoomLink()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    availableRooms: state.app.rooms.entities
  }
}

export default connect(mapStateToProps)(Chats)