defmodule Chat.Repo.Migrations.CreateMessage do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :body, :text
      add :room_id, references(:rooms)
      add :user_id, references(:users)

      timestamps()
    end

    create index(:messages, :room_id)
  end
end
