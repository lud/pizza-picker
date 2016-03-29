defmodule Pickr.MealsetTest do
  use Pickr.ModelCase

  alias Pickr.Mealset

  @valid_attrs %{config_json: "some content", name: "some content", user_id: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Mealset.changeset(%Mealset{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Mealset.changeset(%Mealset{}, @invalid_attrs)
    refute changeset.valid?
  end
end
