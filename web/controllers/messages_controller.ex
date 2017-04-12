defmodule Chat.MessagesController do
  use Chat.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: Chat.HandleUnauthenticatedController
  plug Guardian.Plug.LoadResource

  def create(conn, params = %{ "name" => name, "body" => body }) do
    room = Chat.FindOrCreateRoom.perform(name)
    user = Guardian.Plug.current_resource(conn)

    case Chat.CreateMessageService.perform(room: room, body: body, user: user) do
      { :ok, message } ->
        send_resp(conn, 201, '')
      { :error, changeset} ->
        conn |> put_status(400) |> render("errors.json", errors: changeset.errors)
    end
  end
end