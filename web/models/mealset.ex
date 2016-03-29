defmodule Pickr.Mealset do
  use Pickr.Web, :model

  schema "mealsets" do
    field :name, :string
    field :user_id, :integer
    field :config_json, :string

    timestamps
  end

  @required_fields ~w(name user_id config_json)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
