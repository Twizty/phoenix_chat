defmodule Chat.SessionView do
  @moduledoc false
  def render("user.json", %{ user: user }) do
    %{
      currentUser: %{
        name: user.name,
        token: Phoenix.Token.sign(Chat.Endpoint, "user", user.id)
      }
    }
  end

  def render("error.json", _params) do
    %{
      error: "Couldn't find a user"
    }
  end
end
