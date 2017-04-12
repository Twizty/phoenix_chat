defmodule Chat.Room do
  use Chat.Web, :model

  schema "rooms" do
    field :name, :string
    many_to_many :users, Chat.User, join_through: "rooms_users"

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name])
    |> validate_required([:name])
  end
end
