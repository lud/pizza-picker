defmodule Pickr.Repo.Migrations.CreateIngredient do
  use Ecto.Migration

  def change do
    create table(:ingredients) do
      add :name_fr, :string
      add :list_priority, :integer, null: false, default: 0

      timestamps
    end

    create unique_index(:ingredients, [:name_fr])
  end
end
