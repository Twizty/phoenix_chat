defmodule Chat.RoomChannel do
  use Phoenix.Channel

  def join("room:" <> room_name, params = %{"token" => token} , socket) do
    case Phoenix.Token.verify(socket, "user", token) do
      {:ok, _} -> {:ok, socket}
      {:error, _} -> {:error, %{reason: "unauthorized"}}
    end
  end
end