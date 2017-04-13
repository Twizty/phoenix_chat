defmodule Chat.PageController do
  use Chat.Web, :controller

  def index(conn, _params) do
    case Guardian.Plug.current_resource(conn) do
      nil ->
        render conn, "index.html"
      _user ->
        redirect(conn, to: "/chat")
    end
  end

  def authorized_index(conn, _params) do
    case Guardian.Plug.current_resource(conn) do
      nil ->
        redirect(conn, to: "/home")
      _user ->
        render conn, "index.html"
    end
  end
end
