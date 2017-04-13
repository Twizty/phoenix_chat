defmodule Chat.User do
  use Chat.Web, :model

  schema "users" do
    field :name, :string
    field :encrypted_password, :string
    many_to_many :rooms, Chat.Room, join_through: "rooms_users"

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :encrypted_password])
    |> validate_required([:name, :encrypted_password])
    |> validate_length(:name, min: 1)
  end
end
