defmodule Pickr.Repo.Migrations.CreateMealset do
  use Ecto.Migration

  def change do
    create table(:mealsets) do
      add :name, :string
      add :user_id, :integer
      add :config_json, :string

      timestamps
    end

  end
end
