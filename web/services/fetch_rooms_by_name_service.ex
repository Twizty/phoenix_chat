defmodule Chat.FetchRoomsByNameService do
  alias Chat.Repo
  import Ecto.Query

  def perform(name) do
    query = from r in Chat.Room,
              where: ilike(r.name, ^"%#{name}%"),
              limit: 10

    Repo.all(query)
  end
end