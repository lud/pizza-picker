defmodule Pickr.MealsetController do
  use Pickr.Web, :controller

  alias Pickr.Mealset

  plug :scrub_params, "mealset" when action in [:create, :update]

  def index(conn, _params) do
    mealsets = Repo.all(Mealset)
    render(conn, "index.html", mealsets: mealsets)
  end

  def new(conn, _params) do
    changeset = Mealset.changeset(%Mealset{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"mealset" => mealset_params}) do
    changeset = Mealset.changeset(%Mealset{}, mealset_params)

    case Repo.insert(changeset) do
      {:ok, _mealset} ->
        conn
        |> put_flash(:info, "Mealset created successfully.")
        |> redirect(to: mealset_path(conn, :index))
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    mealset = Repo.get!(Mealset, id)
    render(conn, "show.html", mealset: mealset)
  end

  def edit(conn, %{"id" => id}) do
    mealset = Repo.get!(Mealset, id)
    changeset = Mealset.changeset(mealset)
    render(conn, "edit.html", mealset: mealset, changeset: changeset)
  end

  def update(conn, %{"id" => id, "mealset" => mealset_params}) do
    mealset = Repo.get!(Mealset, id)
    changeset = Mealset.changeset(mealset, mealset_params)

    case Repo.update(changeset) do
      {:ok, mealset} ->
        conn
        |> put_flash(:info, "Mealset updated successfully.")
        |> redirect(to: mealset_path(conn, :show, mealset))
      {:error, changeset} ->
        render(conn, "edit.html", mealset: mealset, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    mealset = Repo.get!(Mealset, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(mealset)

    conn
    |> put_flash(:info, "Mealset deleted successfully.")
    |> redirect(to: mealset_path(conn, :index))
  end
end
