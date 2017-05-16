import React from 'react'
import { connect } from 'react-redux'
import { Socket } from "phoenix"

import { fetchRoom, addMessage, addMessageFromSocket, clearRoom, makeHandshake, scrollMessages } from '../actions'

const NEW_MESSAGE = 'new_msg'

class Chat extends React.Component {
  state = {
    isSubmitDisabled: true
  }

  componentWillMount() {
    this.roomName = this.props.location.pathname.split('/')[2]
    this.props.dispatch(fetchRoom(this.roomName))
    if (this.props.token)
      this.initializeChannel(this.props.token)
  }

  componentDidMount() {
    this.messagesContainer.addEventListener('scroll', () => {
      if (this.needLoadMore()) {
        this.props.dispatch(scrollMessages(this.roomName, this.props.messages[0].id))
      }
    })
  }

  needLoadMore() {
    return this.messagesContainer.scrollTop === 0 && !this.props.isFetching && this.props.hasMore
  }

  componentWillReceiveProps(nextProps) {
    const newRoomName = nextProps.location.pathname.split('/')[2]
    if (newRoomName !== this.roomName) {
      this.props.dispatch(clearRoom())
      this.props.dispatch(fetchRoom(this.roomName))
      this.roomName = newRoomName
    }

    if (nextProps.token && nextProps.token !== this.props.token) {
      this.initializeChannel(nextProps.token)
    }
  }

  initializeChannel(token) {
    this.socket = new Socket("/socket", {params: {token: token}})
    this.socket.connect()
    this.channel = this.socket.channel(`room:${this.roomName}`, { token: token })
    this.channel.join()
    this.channel.on("new_msg", payload => {
      this.props.dispatch(addMessageFromSocket(payload))
    })
  }

  componentDidUpdate(prevProps) {
    const last = this.props.messages[this.props.messages.length - 1]
    const prevLast = prevProps.messages[prevProps.messages.length - 1]
    if (!prevLast && last || (prevLast && last && last.id > prevLast.id)) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
      return
    }

    const first = this.props.messages[0]
    const prevFirst = prevProps.messages[0]

    if (first && prevFirst && prevFirst.id > first.id) {
      this.messagesContainer.scrollTop = document.querySelector(`[data-index-number="${prevFirst.id}"]`).offsetTop
      return
    }
  }

  handleSubmit = () => {
    // this.props.dispatch(addMessage(this.roomName, this.textarea.value))
    this.channel.push(NEW_MESSAGE, {
      room: this.roomName,
      body: this.textarea.value,
      token: this.props.token
    })
    this.textarea.value = ""
    this.setState({isSubmitDisabled: true})
  }

  handleChange = () => {
    this.setState({isSubmitDisabled: this.textarea.value < 1})
  }

  renderMessage(message) {
    return (
      <div data-index-number={message.id} key={message.id}>
        <strong>{message.author}: </strong>{message.body}
      </div>
    )
  }

  renderMessageFromSelf(message) {
    return (
      <div className="self-message" data-index-number={message.id} key={message.id}>
        {message.body}
      </div>
    )
  }

  render() {
    return (
      <div className="chat">
        <div className="form-group messages-wrapper">
          <div className="messages" ref={el => this.messagesContainer = el}>
            {this.props.messages.map(m => {
              return m.author === this.props.currentUserName ? this.renderMessageFromSelf(m) : this.renderMessage(m)
            })}
          </div>
        </div>
        <div className="form-group textarea-wrapper">
          <textarea className="form-control" ref={el => this.textarea = el} onChange={this.handleChange}>
          </textarea>
        </div>
        <input
          className="btn btn-success"
          type="submit"
          value="Send"
          onClick={this.handleSubmit}
          disabled={this.state.isSubmitDisabled}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.app.rooms.entity.messages,
    token: state.app.currentUser.entity.token,
    hasMore: state.app.rooms.entity.hasMore,
    isFetching: state.app.rooms.entity.isFetching,
    currentUserName: state.app.currentUser.entity.name
  }
}

export default connect(mapStateToProps)(Chat)
