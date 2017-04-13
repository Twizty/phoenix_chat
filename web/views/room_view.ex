defmodule Chat.RoomView do
  use Chat.Web, :view

  def render("rooms.json", %{rooms: rooms}) do
    %{ rooms: Enum.map(rooms, fn room -> %{ name: room.name } end) }
  end

  def render("messages.json", %{messages: messages}) do
    %{
      messages: Enum.map(messages, fn e -> %{body: e.body, author: e.user.name, id: e.id} end)
    }
  end
end
