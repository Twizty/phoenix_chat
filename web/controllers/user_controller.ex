defmodule Chat.UserController do
  use Chat.Web, :controller

  def create(conn, %{"user" => user_params}) do
    case Chat.CreateUserService.perform(user_params) do
      {:ok, _user} ->
        conn
        |> send_resp(201, '')
      {:error, :passwords_match} ->
        conn
        |> put_status(400)
        |> render("errors.json", type: :passwords_match)
      {:error, changeset} ->
        conn
        |> put_status(400)
        |> render("errors.json", errors: changeset.errors)
    end
  end
end
