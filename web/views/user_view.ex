defmodule Chat.UserView do
  use Chat.Web, :view

  @passwords_match_error "Password and password confirmation does not match"

  def render("errors.json", %{ type: :passwords_match }) do
    %{
      errors: %{
        password: @passwords_match_error
      }
    }
  end

  def render("errors.json", %{ errors: errs }) do
    Chat.ErrorsSerializer.serialize(errs)
  end
end
