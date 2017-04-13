defmodule Chat.SessionController do
  use Chat.Web, :controller

  plug Guardian.Plug.LoadResource when action in [:sign_out, :handshake]
  plug :refuse_signed_in_users when action == :sign_in
  plug :refuse_not_signed_in_users when action == :sign_out

  def handshake(conn, _params) do
    case Guardian.Plug.current_resource(conn) do
      nil ->
        conn |> send_resp(401, '')
      user ->
        conn |> render("user.json", user: user)
    end
  end

  def sign_in(conn, params = %{ "name" => name, "password" => password}) do
    case Chat.AuthenticateUserService.perform(name, password) do
      {:ok, user} ->
         conn
         |> Guardian.Plug.sign_in(user)
         |> render("user.json", user: user)
      {:error, :not_found} ->
        conn |> put_status(404) |> render("error.json", params)
    end
  end

  def sign_out(conn, _) do
    Guardian.Plug.sign_out(conn) |> send_resp(201, '')
  end

  def refuse_signed_in_users(conn, _) do
    case Guardian.Plug.current_resource(conn) do
      nil ->
        conn
      user ->
        conn |> send_resp(404, '') |> halt
    end
  end

  def refuse_not_signed_in_users(conn, _) do
    case Guardian.Plug.current_resource(conn) do
      nil ->
        conn |> send_resp(404, '') |> halt
      user ->
        conn
    end
  end
end
