defmodule Chat.SessionView do
  @moduledoc false
  def render("user.json", %{ user: user }) do
    %{
      currentUser: %{
        name: user.name
      }
    }
  end

  def render("error.json", _params) do
    %{
      error: "Couldn't find a user"
    }
  end
end
