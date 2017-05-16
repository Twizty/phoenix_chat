defmodule Chat.CreateUserService do
  alias Chat.Repo
  import Ecto.Changeset, only: [unique_constraint: 2]

  def perform(%{ "name" => name, "password" => pass, "password_confirmation" => pass }) do
    create_params = %{
      name: name,
      encrypted_password: Comeonin.Bcrypt.hashpwsalt(pass)
    }

    %Chat.User{}
    |> Chat.User.changeset(create_params)
    |> unique_constraint(:name)
    |> Repo.insert
  end

  def perform(%{ "name" => name, "password" => pass, "password_confirmation" => _}) do
    { :error, :passwords_match }
  end
end
