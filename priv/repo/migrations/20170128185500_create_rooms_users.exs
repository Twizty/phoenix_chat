defmodule Chat.Repo.Migrations.CreateRoomsUsers do
  use Ecto.Migration

  def change do
    create table(:rooms_users) do
      add :room_id, references(:rooms)
      add :user_id, references(:users)
    end

    create unique_index(:rooms_users, [:room_id, :user_id])
  end
end
