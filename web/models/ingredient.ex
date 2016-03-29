defmodule Pickr.Ingredient do
  use Pickr.Web, :model

  schema "ingredients" do
    field :name_fr, :string
    field :list_priority, :integer, default: 0

    timestamps
  end

  @required_fields ~w(name_fr)
  @optional_fields ~w(list_priority)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> unique_constraint(:name_fr)
  end
end
