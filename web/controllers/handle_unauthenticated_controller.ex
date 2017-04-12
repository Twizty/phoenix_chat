defmodule Chat.HandleUnauthenticatedController do
  use Chat.Web, :controller

  def unauthenticated(conn, _params) do
    conn
    |> send_resp(401, '')
  end
end
