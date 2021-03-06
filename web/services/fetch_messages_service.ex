defmodule Chat.FetchMessagesService do
  alias Chat.Repo
  alias Chat.Message
  import Ecto.Query

  def perform(room, last_message_id \\ nil) do
    query = from m in Message,
              where: m.room_id == ^room.id,
              order_by: [desc: m.id],
              limit: 30,
              preload: [:user]

    query |> add_last_message_id_to_query(last_message_id) |> Repo.all
  end

  def add_last_message_id_to_query(query, nil) do
    query
  end

  def add_last_message_id_to_query(query, last_message_id) do
    where(query, [m], m.id < ^last_message_id)
  end
end
