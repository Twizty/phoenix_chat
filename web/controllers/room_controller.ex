defmodule Chat.RoomController do
  use Chat.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: Chat.HandleUnauthenticatedController

  def index(conn, params = %{ "name" => name }) do
    rooms = Chat.FetchRoomsByNameService.perform(name)
    render conn, "rooms.json", rooms: rooms
  end

  def show(conn, params = %{ "name" => name, "last_message_id" => last_id }) do
    room = Chat.FindOrCreateRoom.perform(name)
    messages = Chat.FetchMessagesService.perform(room, last_id)

    render conn, "messages.json", messages: messages
  end

  def show(conn, params = %{ "name" => name }) do
    show(conn, %{ "name" => name, "last_message_id" => nil })
  end
end
