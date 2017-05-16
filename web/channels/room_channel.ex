defmodule Chat.RoomChannel do
  use Phoenix.Channel

  alias Chat.User
  alias Chat.Repo
  import Ecto.Query

  @unauthorized "unauthorized"
  @message_event "new_msg"

  def join("room:" <> room_name, params = %{ "token" => token } , socket) do
    case Phoenix.Token.verify(socket, "user", token) do
      { :ok, _ } -> { :ok, socket }
      { :error, _ } -> { :error, %{ reason: @unauthorized } }
    end
  end

  def handle_in("new_msg", %{"body" => body, "room" => room_name, "token" => token }, socket) do
    case Phoenix.Token.verify(socket, "user", token) do
      { :ok, user_id } ->
        broadcast_message(body, room_name, user_id, socket)
      { :error, _ } -> { :error, %{ reason: @unauthorized } }
    end
  end

  def broadcast_message(body, room_name, user_id, socket) do
    room = Chat.FindOrCreateRoom.perform(room_name)
    user = Repo.get(User, user_id)
    IO.inspect(user)

    case Chat.CreateMessageService.perform(room: room, body: body, user: user) do
      { :ok, message } ->
        broadcast!(
          socket,
          @message_event,
          %{ body: message.body, author: user.name, id: message.id }
        )
        { :noreply, socket }
      { :error, changeset} -> { :error, %{ reason: changeset.errors } }
    end
  end
end
