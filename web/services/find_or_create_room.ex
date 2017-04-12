defmodule Chat.FindOrCreateRoom do
  alias Chat.Repo
  import Ecto.Query

  def perform(name) do
    query = from r in Chat.Room,
            where: r.name == ^name

    Repo.one(query) || Repo.insert!(Chat.Room.changeset(%Chat.Room{}, %{ name: name }))
  end
end