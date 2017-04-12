defmodule Chat.CreateMessageService do
  alias Chat.Repo

  alias Chat.Message

  def perform(room: room, body: body, user: user) do
    create_params = %{
      room_id: room.id,
      user_id: user.id,
      body: body,
    }

    Message.changeset(%Message{}, create_params) |> Repo.insert
  end
end