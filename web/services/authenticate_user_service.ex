defmodule Chat.AuthenticateUserService do
  alias Chat.Repo
  import Ecto.Query

  def perform(name, password) do
    query = from u in Chat.User, where: u.name == ^name
    query |> Repo.one |> check_password(password)
  end

  defp check_password(nil, _) do
    { :error, :not_found }
  end

  defp check_password(user, password) do
    if Comeonin.Bcrypt.checkpw(password, user.encrypted_password) do
      { :ok, user }
    else
      { :error, :not_found }
    end
  end
end
