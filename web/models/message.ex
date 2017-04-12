defmodule Chat.Message do
  use Chat.Web, :model

  schema "messages" do
    field :body, :string
    belongs_to(:user, Chat.User)
    belongs_to(:room, Chat.Room)

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:body, :room_id, :user_id])
    |> validate_required([:body, :room_id, :user_id])
    |> validate_length(:body, min: 1)
  end
end
