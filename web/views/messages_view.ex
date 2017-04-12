defmodule Chat.MessagesView do
  use Chat.Web, :view

  def render("errors.json", %{ errors: errs }) do
    Chat.ErrorsSerializer.serialize(errs)
  end
end